module.exports = (sequelize, Sequelize) => {
  const Candidate = sequelize.define("candidates", {
    userId: {
      type: Sequelize.STRING
    },
    fullname: {
      type: Sequelize.STRING
    },
    visible: {
      type: Sequelize.BOOLEAN
    },
  });
  
  return Candidate;
};