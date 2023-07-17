const UserModel = require('../model/user.model');
const bcrpyt = require('bcrypt');
const jwtUtils = require('../utils/jwt-utils');
const authService = {
  createAccount: async (userinfo)=>{
    const result = await UserModel.findOne({email: userinfo.email});
    if (result) {
      throw new Error('User already exists');
    } else {
      const password = bcrpyt.hashSync(userinfo.password, 2);
      userinfo.password = password;
      const user = new UserModel(userinfo);
      await user.save();
    }
  },
  login: async (userinfo)=>{
    const user = await UserModel.findOne({email: userinfo.email});
    if (user) {
      if (bcrpyt.compareSync(userinfo.password, user.password)) {
        return jwtUtils.createToken(user.id);
      } else {
        throw new Error('email or password is wrong');
      }
    } else {
      throw new Error('email or password is wrong');
    }
  },
};

module.exports = authService;
