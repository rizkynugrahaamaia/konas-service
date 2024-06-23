//Get Public & Protected Resources
const { authJwt, basicAuth } = require("../middleware");
const controller = require("../controllers/user.controller");
const user = require("../controllers/user/handlers/api_handler");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);
  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
  app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
  app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
  app.get("/participant-list", [authJwt.verifyToken, authJwt.isAdmin], controller.participantList);

  // API Peserta
  app.get("/api/users/v1/user", authJwt.verifyToken, user.getUser);
  app.get("/api/users/v1/user/:userId", authJwt.verifyToken, user.getUser);
  app.post("/api/users/v1/create", authJwt.verifyToken, user.createUser);
  app.put("/api/users/v1/edit", authJwt.verifyToken, user.updateDataUser);
  app.get("/api/users/v1/user/:userId", basicAuth.isAuthenticated, user.getUser);
  app.get("/api/users/v1/list", authJwt.verifyToken, user.getListUser);
  app.post("/api/users/v1/presence/:userId", authJwt.verifyToken, user.updatePresenceUser);
  app.del("/api/users/v1/delete/:userId", authJwt.verifyToken, user.deleteUser);

};