
const wrapper = require('../../../helpers/utils/wrapper');
const commandHandler = require('../repositories/commands/command_handler');
const commandModel = require('../repositories/commands/command_model');
const queryHandler = require('../repositories/queries/query_handler');
const validator = require('../utils/validator');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const updatePresenceUser = async (req, res) => {
  const { params:payload } = req;
  const postRequest = async (result) => commandHandler.updatePresenceUser(result);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Presensi User')
      : wrapper.response(res, 'success', result, 'Presensi User', http.OK);
  };
  sendResponse(await postRequest(payload));
};

const deleteUser = async (req, res) => {
  const { params:payload } = req;
  const postRequest = async (result) => commandHandler.deleteUser(result);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Delete User')
      : wrapper.response(res, 'success', result, 'Delete User', http.OK);
  };
  sendResponse(await postRequest(payload));
};

const getUser = async (req, res) => {
  const { userId } = (req.params.userId) ? req.params:req;
  const getData = async () => queryHandler.getUser(userId);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get User', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get User', http.OK);
  };
  sendResponse(await getData());
};

const getListUser = async (req, res) => {
  const { query:payload } = req;
  const getData = async () => queryHandler.getListUser(payload);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get User', httpError.NOT_FOUND)
      : wrapper.paginationResponse(res, 'success', result, 'Get List User', http.OK);
  };
  sendResponse(await getData());
};

const createUser = async (req, res) => {
  const { body:payload } = req;
  const validatePayload = validator.isValidPayload(payload, commandModel.user);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.createUser(result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Create User', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Create User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

const updateDataUser = async (req, res) => {
  const { body:payload } = req;
  const validatePayload = validator.isValidPayload(payload, commandModel.updateUser);
  const postRequest = async (result) => {
    if (result.err) {
      return result;
    }
    return commandHandler.updateDataUser(result.data);
  };
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Update User', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Update User', http.OK);
  };
  sendResponse(await postRequest(validatePayload));
};

module.exports = {
  getUser,
  getListUser,
  createUser,
  updatePresenceUser,
  updateDataUser,
  deleteUser
};
