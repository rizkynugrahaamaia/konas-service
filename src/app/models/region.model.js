module.exports = (sequelize, Sequelize) => {
    const Region = sequelize.define("regions", {
      regionId: {
        type: Sequelize.STRING
      },
      fullname: {
        type: Sequelize.STRING
      },
    });
  
    return Region;
  };