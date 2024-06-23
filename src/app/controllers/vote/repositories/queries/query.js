const wrapper = require('../../../../helpers/utils/wrapper');
const db = require("../../../../models");
const Candidate = db.candidate;
const Vote = db.vote;
const { Op } = require('sequelize');

class Query {
  async findOneCandidate(parameter) {
    const payload = {
      where: parameter
    };

    const recordset = await Candidate.findOne(payload);
    return wrapper.responseDb(recordset);
  }

  async findManyCandidate(fieldName = "id", sortParam = 1,) {
    const payload = {
      attributes: [ 'userId', 'fullname' ],
      order: [
        [fieldName, (sortParam == 1) ? 'ASC':'DESC'],
      ],
    };

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
      attributes: ['id', 'name'],
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
