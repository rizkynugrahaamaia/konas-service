const joi = require('joi');

const user = joi.object({
  username: joi.string().required(),
  fullname: joi.string().required(),
  region: joi.string().required(),
  status: joi.string().required(),
  roomMeet: joi.string(),
  flight: joi.string(),
  roomStay: joi.string(),
  photo: joi.string(),
  birthday: joi.date().required(),
});

const updateUser = joi.object({
  username: joi.string().required(),
  fullname: joi.string(),
  password: joi.string().required(),
  region: joi.string(),
  status: joi.string(),
  roomMeet: joi.string(),
  flight: joi.string(),
  roomStay: joi.string(),
  photo: joi.string(),
  birthday: joi.date(),
});

module.exports = {
  user,
  updateUser,
};
