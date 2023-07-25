const jwt = require('jsonwebtoken');
const config = require('./config');

const jwtUtils = {
  createToken: (data) => {
    return jwt.sign({
      userId: data,
    }, config.SECRET_KEY, {expiresIn: '7d'});
  },

  validateToken: (token) => {
    return jwt.verify(token, config.SECRET_KEY);
  },
};

module.exports = jwtUtils;
