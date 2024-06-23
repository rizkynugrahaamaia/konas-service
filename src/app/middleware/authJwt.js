const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const role = require("../config/role.config");
const db = require("../models");
const User = db.user;
const wrapper = require('../helpers/utils/wrapper');
const { UnauthorizedError } = require('../helpers/error');

verifyToken = (req, res, next) => {
  let token = req.cookies.token;
  const path = req.route.path;
  if (!token) {
    return wrapper.response(res, 'fail', { err: new UnauthorizedError('Unauthorized') });
  }

  jwt.verify(
    token,
    config.secret,      
    (err, decoded) => {
      if (err) {
        return wrapper.response(res, 'fail', { err: new UnauthorizedError('Unauthorized') });
      }

      if(decoded.role != "Super Admin"){
        const allPath = (decoded.role == "Sekertaris" || decoded.role == "Admin") ? ((decoded.role == "Admin") ? role.admin:role.sekertaris)
        : ((decoded.role == "Formal") ? role.formal:role.nonFormal);

        if(!(allPath.indexOf(path) > -1)){
          return wrapper.response(res, 'fail', { err: new UnauthorizedError('Role Unauthorized') });
        }
      }

      req.userId = decoded.userId;
      next();
    }
  );
};

isAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate User role!",
    });
  }
};

isModerator = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Moderator Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Moderator role!",
    });
  }
};

isModeratorOrAdmin = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.userId);
    const roles = await user.getRoles();

    for (let i = 0; i < roles.length; i++) {
      if (roles[i].name === "moderator") {
        return next();
      }

      if (roles[i].name === "admin") {
        return next();
      }
    }

    return res.status(403).send({
      message: "Require Moderator or Admin Role!",
    });
  } catch (error) {
    return res.status(500).send({
      message: "Unable to validate Moderator or Admin role!",
    });
  }
};

const authJwt = {
  verifyToken,
  isAdmin,
  isModerator,
  isModeratorOrAdmin,
};
module.exports = authJwt