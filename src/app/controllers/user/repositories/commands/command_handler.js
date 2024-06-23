
const User = require('./domain');
const user = new User();

const updatePresenceUser = async (payload) => {
  const postCommand = async payload => user.updatePresenceUser(payload);
  return postCommand(payload);
};

const createUser = async (payload) => {
  const postCommand = async payload => user.generateUser(payload);
  return postCommand(payload);
};

const updateDataUser = async (payload) => {
  const postCommand = async payload => user.updateDataUser(payload);
  return postCommand(payload);
};

const deleteUser = async (payload) => {
  const postCommand = async payload => user.deleteUser(payload);
  return postCommand(payload);
};

module.exports = {
  createUser,
  updateDataUser,
  updatePresenceUser,
  deleteUser
};
