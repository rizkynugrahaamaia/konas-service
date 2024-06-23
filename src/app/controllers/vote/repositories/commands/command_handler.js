
const Vote = require('./domain');
const vote = new Vote();

const createCandidate = async (payload) => {
  const postCommand = async payload => vote.generateCandidate(payload);
  return postCommand(payload);
};

const createVote = async (payload) => {
  const postCommand = async payload => vote.generateVote(payload);
  return postCommand(payload);
};

module.exports = {
  createCandidate,
  createVote
};
