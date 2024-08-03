const region = require("../controllers/attribute/handlers/api_handler");
const { authJwt, basicAuth } = require("../middleware");

module.exports = function(app) {
  app.get("/api/auth/v1/region", basicAuth.isAuthenticated, region.getManyRegion);
  app.get("/api/auth/v1/role", basicAuth.isAuthenticated, region.getManyRole);
  app.get("/api/auth/v1/candidate/list", basicAuth.isAuthenticated, region.getManyCandidate);
};