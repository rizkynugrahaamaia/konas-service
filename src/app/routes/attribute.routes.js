const region = require("../controllers/attribute/handlers/api_handler");
const { authJwt, basicAuth } = require("../middleware");

module.exports = function(app) {
  app.get("/api/auth/v1/region", authJwt.verifyToken, region.getManyRegion);
  app.get("/api/auth/v1/role", authJwt.verifyToken, region.getManyRole);
};