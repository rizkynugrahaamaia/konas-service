const wrapper = require('../../../../helpers/utils/wrapper');
const db = require("../../../../models");
const Candidate = db.candidate;
const Vote = db.vote;

class Command {

  constructor() {
  }

  async insertOneCandidate(document) {
    const recordset = await Candidate.create(document);
    return wrapper.responseDb(recordset);
  }
  
  async insertOneVote(document) {
    const recordset = await Vote.create(document);
    return wrapper.responseDb(recordset);
  }
  
  async deleteAllCandidate() {
    const recordset = await Vote.truncate();
    return wrapper.responseDb(recordset);
  }

}

module.exports = Command;
