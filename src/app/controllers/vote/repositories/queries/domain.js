
const Query = require('./query');
const Command = require('../commands/command');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const { Op } = require('sequelize');
const { v4:uuid } = require('uuid');

class Vote {

  constructor(){
    this.query = new Query();
    this.command = new Command();
  }

  async viewManyCandidate() {
    const candidate = await this.query.findManyCandidate();
    const { data } = candidate;
    return wrapper.data(data);
  }

  async viewManyVote() {
    const candidate = await this.query.findManyCandidate();
    if(candidate.data.length < 1){
      const { data } = candidate;
      return wrapper.data(data);
    }

    const data = new Array;
    for(let item of candidate.data){
      const { userId:candidateId, fullname } = item;
      const count = await this.query.countVote({ candidateId });
      data.push({
        fullname,
        count: count.data
      });
    }
    return wrapper.data(data);
  }

}

module.exports = Vote;
