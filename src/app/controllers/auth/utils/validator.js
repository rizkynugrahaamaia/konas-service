const joi = require('joi');
const validate = require('validate.js');
const wrapper = require('../../../helpers/utils/wrapper');
const { ConflictError } = require('../../../helpers/error');

const isValidPayload = (payload, constraint) => {
  const { value, error } = joi.validate(payload, constraint);
  let message='failed insert';
  if(!validate.isEmpty(error)){
    error.details.map((res)=>{
      const path=res.path.shift();
      let result={};
      result[path]=res.message;
      message=res.message;
      return result;
    });
    return wrapper.error(new ConflictError(message));
  }
  return wrapper.data(value, 'success', 200);

};

module.exports = {
  isValidPayload
};
