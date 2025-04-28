//Signin, Signup and Signout action
const { basicAuth, authJwt } = require("../middleware");
const auth = require("../controllers/auth/handlers/api_handler");

module.exports = function(app) {  
  // API Sign
  app.post("/api/auth/v1/signup", basicAuth.isAuthenticated, auth.registerUser);
  app.post("/api/auth/v1/signin", basicAuth.isAuthenticated, auth.signIn);
  app.post("/api/auth/v1/signout", authJwt.verifyToken, auth.signOut);
};