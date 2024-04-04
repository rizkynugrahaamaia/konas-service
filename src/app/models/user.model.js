module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      username: {
        type: Sequelize.STRING
      },
      nik: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      regional: {
        type: Sequelize.STRING
      },
      presence: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return User;
  };