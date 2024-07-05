
const User = require('./domain');
const user = new User();

const getUser = async (userId) => {
  const getData = async () => {
    const result = await user.viewUser(userId);
    return result;
  };
  const result = await getData();
  return result;
};

const getListUser = async (userId) => {
  const getData = async () => {
    const result = await user.viewListUser(userId);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getUser,
  getListUser,
};
