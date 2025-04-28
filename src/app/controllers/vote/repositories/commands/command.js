const wrapper = require('../../../../helpers/utils/wrapper');
const db = require("../../../../models");
const Candidate = db.candidate;
const Vote = db.vote;

class Command {

  constructor() {
  }

  // Fungsi ini digunakan untuk menyisipkan data kandidat baru ke dalam database.
  async insertOneCandidate(document) {
    // Menggunakan model Candidate untuk membuat entri baru di database.
    const recordset = await Candidate.create(document);
    return wrapper.responseDb(recordset);
  }
  
  async insertOneVote(document) {
    const recordset = await Vote.create(document);
    return wrapper.responseDb(recordset);
  }
  
  async deleteAllCandidate() {
    const recordset = await Candidate.destroy({
      where: {},
    });

    return wrapper.responseDb(recordset);
  }

  async deleteAllVote() {
    const recordset = await Vote.destroy({
      where: {},
    });

    return wrapper.responseDb(recordset);
  }

}

module.exports = Command;
