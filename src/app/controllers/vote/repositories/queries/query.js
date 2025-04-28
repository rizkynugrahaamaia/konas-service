const wrapper = require('../../../../helpers/utils/wrapper');
const db = require("../../../../models");
const Candidate = db.candidate;
const Vote = db.vote;
// const { Op } = require('sequelize');

class Query {

  // Fungsi ini digunakan untuk mencari kandidat berdasarkan parameter yang diberikan.
  async findOneCandidate(parameter) {
    const payload = {
      where: parameter
    };

    // Sequelize findOne digunakan untuk mencari satu data kandidat berdasarkan parameter yang diberikan.
    const recordset = await Candidate.findOne(payload);
    return wrapper.responseDb(recordset);
  }

  // Fungsi ini digunakan untuk mencari banyak kandidat berdasarkan parameter yang diberikan.
  async findManyCandidate(fieldName = "id", sortParam = 1,) {
    
    // Menggunakan Sequelize untuk mencari banyak kandidat 
    // dengan atribut tertentu dan urutan tertentu.
    const payload = {
      attributes: [ 'userId', 'fullname' ],
      order: [
        [fieldName, (sortParam == 1) ? 'ASC':'DESC'],
      ],
    };

    // Menggunakan Sequelize findAll untuk mendapatkan semua data kandidat yang sesuai dengan parameter yang diberikan.
    const recordset = await Candidate.findAll(payload);
    return wrapper.responseDb(recordset);
  }

  async findOneVote(parameter) {
    const payload = {
      where: parameter
    };

    const recordset = await Vote.findOne(payload);
    return wrapper.responseDb(recordset);
  }
  
  async findManyVote(where, fieldName = "id", sortParam = 1,) {
    const payload = {
      where,
      attributes: ['id'],
      order: [
        [fieldName, (sortParam == 1) ? 'ASC':'DESC'],
      ],
    };

    const recordset = await Vote.findAll(payload);
    return wrapper.responseDb(recordset);
  }

  async countVote(parameter) {
    const payload = {
      where: parameter
    };

    const recordset = await Vote.count(payload);
    return wrapper.data(recordset);
  }

}

module.exports = Query;
