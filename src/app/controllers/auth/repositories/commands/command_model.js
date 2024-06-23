const joi = require('joi');

const register = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
  fullname: joi.string().required(),
  region: joi.string().required(),
  status: joi.string().required(),
  birthday: joi.date().required()
});

const signIn = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
});

module.exports = {
  register,
  signIn
};
