const vote = require("../controllers/vote/handlers/api_handler");
const { authJwt } = require("../middleware");

//1. authJwt.verifyToken adalah middleware yang berfungsi:
//   - Memastikan pengguna memiliki token sebelum mengakses endpoint.
//   - Memvalidasi token menggunakan JWT.
//   - Memeriksa apakah pengguna memiliki hak akses berdasarkan peran/role.
//   - Meneruskan eksekusi jika semua pemeriksaan lolos.

module.exports = function(app) {
  //candidates
  app.get("/api/candidate/v1/list", authJwt.verifyToken, vote.getManyCandidate);
  app.post("/api/candidate/v1/candidate", authJwt.verifyToken, vote.createCandidate);
  app.delete("/api/candidate/v1/candidate", authJwt.verifyToken, vote.deleteCandidate);

  //votes
  app.get("/api/vote/v1/list", authJwt.verifyToken, vote.getManyVote);
  app.get("/api/vote/v1/user", authJwt.verifyToken, vote.getOneVote);
  app.post("/api/vote/v1/vote/:candidateId", authJwt.verifyToken, vote.createVote);
  app.delete("/api/vote/v1/list", authJwt.verifyToken, vote.deleteVote);
};