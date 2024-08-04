//Signin, Signup and Signout action
const { verifySignUp, basicAuth, authJwt } = require("../middleware");
const controller = require("../controllers/auth.controller");
const auth = require("../controllers/auth/handlers/api_handler");

module.exports = function(app) {

  //global level middleware
  app.use(function(req, res, next) {
    // res.header(
    //   "Access-Control-Allow-Headers",
    //   "Origin, Content-Type, Accept"
    // );
    res.header('Access-Control-Allow-Origin',  process.env.WEB_URL); // Replace with your actual domain
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  app.post("/api/auth/signup", [ verifySignUp.checkDuplicateUsernameOrNik, verifySignUp.checkRolesExisted ], controller.signup);
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/signout", controller.signout);
  
  // API Sign
  app.post("/api/auth/v1/signup", basicAuth.isAuthenticated, auth.registerUser);
  app.post("/api/auth/v1/signin", basicAuth.isAuthenticated, auth.signIn);
  app.post("/api/auth/v1/signout", authJwt.verifyToken, auth.signOut);
};