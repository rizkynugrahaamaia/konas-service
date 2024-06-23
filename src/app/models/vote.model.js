module.exports = (sequelize, Sequelize) => {
  const Vote = sequelize.define("votes", {
    userId: {
      type: Sequelize.STRING
    },
    candidateId: {
      type: Sequelize.STRING
    },
  });
  
  return Vote;
};