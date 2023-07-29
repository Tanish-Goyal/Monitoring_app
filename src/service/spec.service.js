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

  getSpecIdList: async (appId) => {
    
    const SpecInfo = await Spec.aggregate([
      {
        $match: { appId: appId },
      },
      {
        $group: {
          _id: null,
          specIdList: { $addToSet: '$_id' },
        }
      },
    ]);    
    return SpecInfo[0].specIdList;
  },

  getSpecId: async (appId) => {
    
    const SpecInfo = await Spec.aggregate([
      {
        $match: { appId: appId },
      },
      {
        $group: {
          _id: null,
          specIdList: { $addToSet: '$_id' },
        }
      },
    ]);    
    return SpecInfo[0].specIdList[0];
  },
};

module.exports = specService;
