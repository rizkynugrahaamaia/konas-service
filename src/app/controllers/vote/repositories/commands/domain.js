
const Command = require('./command');
const Query = require('../queries/query');
const QueryUser = require('../../../user/repositories/queries/query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError, BadRequestError, ConflictError } = require('../../../../helpers/error');

class Vote {

  constructor(){
    this.query = new Query();
    this.queryUser = new QueryUser();
    this.command = new Command();
  }

  async generateCandidate(payload) {
    const { candidate:data } = payload;
    await this.command.deleteAllCandidate();
    for(let userId of data){
      const user = await this.queryUser.findOneUser({ userId });
      if(user.data) {
        const { fullname } = user.data;
        const document = { userId, fullname };
        const candidate = await this.query.findOneCandidate({ userId });
        if(candidate.err) await this.command.insertOneCandidate(document);
      }
    }

    const { data:result } = await this.query.findManyCandidate();
    return wrapper.data(result);
  }

  async generateVote(payload) {
    const { userId, candidateId } = payload;
    const voter = await this.query.findOneVote({ userId });
    if (voter.data) {
      return wrapper.error(new ConflictError('anda sudah melakukan vote'));
    }

    const candidate = await this.query.findOneCandidate({ userId: candidateId });
    if (candidate.err) {
      return wrapper.error(new NotFoundError('Kandidat belum terdaftar'));
    }

    const vote = await this.command.insertOneVote({ userId, candidateId });
    if (vote.err) {
      return wrapper.error(new BadRequestError('voting gagal'));
    }

    return wrapper.data(null);
  }
}

module.exports = Vote;
