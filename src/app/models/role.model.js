module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", { 
      roleId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING
      },
    });
  
    return Role;
  };