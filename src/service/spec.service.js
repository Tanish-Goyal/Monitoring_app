const Spec = require('../model/spec.model');

const specService = {
  createSpec: async (specData) => {
    const spec = new Spec(specData);
    await spec.save();
  },

  deleteSpec: async (specId) => {
    await Spec.findByIdAndDelete(specId);
  },

  getSpec: async (specId) => {
    const spec = await Spec.findById(specId);
    return spec;
  },
  
};

module.exports = specService;
