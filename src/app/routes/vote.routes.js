const vote = require("../controllers/vote/handlers/api_handler");
const { authJwt } = require("../middleware");

module.exports = function(app) {
  app.get("/api/candidate/v1/list", authJwt.verifyToken, vote.getManyCandidate);
  app.post("/api/candidate/v1/candidate", authJwt.verifyToken, vote.createCandidate);
  app.get("/api/vote/v1/list", authJwt.verifyToken, vote.getManyVote);
  app.post("/api/vote/v1/vote/:candidateId", authJwt.verifyToken, vote.createVote);
};