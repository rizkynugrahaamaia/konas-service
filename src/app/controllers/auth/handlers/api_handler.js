
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const postDataLogin = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.login);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.postDataLogin(result.data);
  };

  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Login User')
      : wrapper.response(res, 'success', result, 'Login User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const registerUser = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.register);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.registerUser(result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Register User', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Register User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const signIn = async (req, res) => {
  const payload = req.body;
  const validatePayload = validator.isValidPayload(payload, commandModel.signIn);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.signIn(result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Sign In User', httpError.CONFLICT)
      : wrapper.signResponse(res, result, 'Sign In User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const signOut = async (req, res) => {
  const sendResponse = async (result) => wrapper.signOutResponse(res, 'Sign Out User', http.OK);
  sendResponse({data: {}});
};

module.exports = {
  postDataLogin,
  registerUser,
  signIn,
  signOut
};
