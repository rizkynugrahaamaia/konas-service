
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

const deleteCandidate = async () => {
  const postCommand = async () => vote.deleteCandidate();
  return postCommand();
};

const deleteVote = async () => {
  const postCommand = async () => vote.deleteVote();
  return postCommand();
};


module.exports = {
  createCandidate,
  createVote,
  deleteCandidate,
  deleteVote
};
