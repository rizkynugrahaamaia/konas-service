2
const wrapper = require('../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const commandHandler = require('../repositories/commands/command_handler');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const getManyCandidate = async (req, res) => {
  const getData = async () => queryHandler.getManyCandidate();
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Candidate', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get Many Candidate', http.OK);
  };
  sendResponse(await getData());
};

const getManyVote = async (req, res) => {
  const getData = async () => queryHandler.getManyVote();
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Many Vote', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get Many Vote', http.OK);
  };
  sendResponse(await getData());
};

const getOneVote = async (req, res) => {
  const { userId } = (req.params.userId) ? req.params:req;
  const getData = async () => queryHandler.getOneVote(userId);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get One Vote', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get One Vote', http.OK);
  };
  sendResponse(await getData());
};

const createCandidate = async (req, res) => {
  const {body:payload} = req;
  const postRequest = async (result) => commandHandler.createCandidate(result);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Create Candidate', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Create Candidate', http.CREATED);
  };
  sendResponse(await postRequest(payload));
};

const deleteCandidate = async (req, res) => {
  const postRequest = async ( ) => commandHandler.deleteCandidate();
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Delete Candidate')
      : wrapper.response(res, 'success', result, 'Delete Kandidat', http.OK);
  };
  sendResponse(await postRequest());
};

const deleteVote = async (req, res) => {
  const postRequest = async ( ) => commandHandler.deleteVote();
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Delete Vote')
      : wrapper.response(res, 'success', result, 'Delete Vote', http.OK);
  };
  sendResponse(await postRequest());
};

const createVote = async (req, res) => {
  const payload = {...req.params, userId: req.userId};
  const postRequest = async (result) => commandHandler.createVote(result);
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Create Vote', httpError.CONFLICT)
      : wrapper.response(res, 'success', result, 'Create Vote', http.CREATED);
  };
  sendResponse(await postRequest(payload));
};

module.exports = {
  getManyCandidate,
  getManyVote,
  getOneVote,
  createCandidate,
  createVote,
  deleteCandidate,
  deleteVote
};
