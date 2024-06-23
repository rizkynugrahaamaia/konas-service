
const wrapper = require('../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const { ERROR:httpError, SUCCESS:http } = require('../../../helpers/http-status/status_code');

const getManyRegion = async (req, res) => {
  const getData = async () => queryHandler.getManyRegion();
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Region', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get Many Region', http.OK);
  };
  sendResponse(await getData());
};

const getManyRole = async (req, res) => {
  const getData = async () => queryHandler.getManyRole();
  const sendResponse = async (result) => {
    (result.err) ? wrapper.response(res, 'fail', result, 'Get Role', httpError.NOT_FOUND)
      : wrapper.response(res, 'success', result, 'Get Many Role', http.OK);
  };
  sendResponse(await getData());
};

module.exports = {
    getManyRegion,
    getManyRole,
};
