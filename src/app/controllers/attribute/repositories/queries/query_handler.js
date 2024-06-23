
const Region = require('./domain');
const region = new Region();

const getManyRegion = async () => {
  const getData = async () => {
    const result = await region.viewManyRegions();
    return result;
  };
  const result = await getData();
  return result;
};

const getManyRole = async () => {
  const getData = async () => {
    const result = await region.viewManyRole();
    return result;
  };
  const result = await getData();
  return result;
};

module.exports = {
  getManyRegion,
  getManyRole,
};
