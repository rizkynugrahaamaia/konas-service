
const Vote = require('./domain');
const vote = new Vote();

const getManyCandidate = async () => {
  const getData = async () => {
    const result = await vote.viewManyCandidate();
    return result;
  };
  const result = await getData();
  return result;
};

const getManyVote = async () => {
  const getData = async () => {
    const result = await vote.viewManyVote();
    return result;
  };
  const result = await getData();
  return result;
};

const getOneVote = async (userId) => {
  const getData = async () => {
    const result = await vote.viewOneVote(userId);
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getManyCandidate,
  getManyVote,
  getOneVote
};
