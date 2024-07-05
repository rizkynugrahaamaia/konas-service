
const Auth = require('./domain');
// const Mongo = require('../../../../helpers/databases/mongodb/db');
// const config = require('../../../../infra/configs/global_config');
// const db = new Mongo(config.get('/mongoDbUrl'));
  const auth = new Auth();

const postDataLogin = async (payload) => {
  const postCommand = async payload => auth.generateCredential(payload);
  return postCommand(payload);
};

const registerUser = async (payload) => {
  const postCommand = async payload => auth.register(payload);
  return postCommand(payload);
};

const signIn = async (payload) => {
  const postCommand = async payload => auth.signIn(payload);
  return postCommand(payload);
};

module.exports = {
  postDataLogin,
  registerUser,
  signIn
};
