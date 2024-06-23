module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    userId: {
      type: Sequelize.STRING
    },
    username: {
      type: Sequelize.STRING
    },
    fullname: {
      type: Sequelize.STRING
    },
    birthday: {
      type: Sequelize.DATE
    },
    password: {
      type: Sequelize.STRING
    },
    status: {
      type: Sequelize.STRING
    },
    region: {
      type: Sequelize.STRING
    },
    presence: {
      type: Sequelize.BOOLEAN
    },
    roomMeet: {
      type: Sequelize.STRING
    },
    flight: {
      type: Sequelize.STRING
    },
    roomStay: {
      type: Sequelize.STRING
    },
    photo: {
      type: Sequelize.STRING
    },
  });
    
  return User;
};