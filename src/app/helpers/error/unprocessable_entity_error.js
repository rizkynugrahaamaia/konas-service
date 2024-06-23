
const CommonError = require('./common_error');

class UnprocessableEntityError extends CommonError {
  constructor(message) {
    super(message || 'UnprocessableEntity');
  }
}

module.exports = UnprocessableEntityError;
