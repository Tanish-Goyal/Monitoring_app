const Spec = require('../model/spec.model');

const specService = {
  createSpec: async (specData) => {
    const spec = new Spec(specData);
    await spec.save();
  },

  deleteSpec: async (specId) => {
    await Spec.findByIdAndDelete(specId);
  },

  getSpecBySpecId: async (specId) => {
    const spec = await Spec.findById(specId);
    return spec;
  },

  getSpecId: async (appId) => {
    
    const SpecId = await Spec.aggregate([
      {
        $match: { appId: appId },
      },
      {
        $group: {
          _id: null,
          specId: { $addToSet: '$_id' },
        }
      },
    ]);    
    return SpecId[0].specId;
  },
};

module.exports = specService;
