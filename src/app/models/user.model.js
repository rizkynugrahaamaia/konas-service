module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    userId: {
      type: Sequelize.STRING,
      primaryKey: true, // Tandai sebagaxi primary key
      allowNull: false,
      unique: true
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      index: true
    },
    fullname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthday: {
      type: Sequelize.DATE
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false
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