const db = require("../models");
const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };

  exports.participantList = async (req, res) => {
    try {
     const userData = await Role.findAll({ 
        include: {
          model: User,
        },
        where: {
          id: {
            [Op.eq]: 2
          }
        },
        attributes: [
          'users.username'
        ]
      });
    const payload = {
      data: userData[0].users
    }
    res.status(200).send(payload);
    } catch (error) {
      return res.status(500).send({
        message: error.message
      })
    }
  };