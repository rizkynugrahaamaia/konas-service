const wrapper = require('../../../../helpers/utils/wrapper');
const db = require("../../../../models");
const User = db.user;

class Query {
  async findOneUser(parameter) {
    const payload = {
      where: parameter
    };

    const recordset = await User.findOne(payload);
    return wrapper.responseDb(recordset);
  }

  async findListUser(fieldName, limit, offset, param, sortParam = 1,) {
    const payload = {
      attributes: [ 'userId', 'fullname', 'region', 'presence', 'status' ],
      where: param,
      order: [
        [fieldName, (sortParam == 1) ? 'ASC':'DESC'],
      ],
      limit,
      offset,
    };

    const recordset = await User.findAll(payload);
    return wrapper.responseDb(recordset);
  }

  async countUser(parameter) {
    const payload = {
      where: parameter
    };

    const recordset = await User.count(payload);
    return wrapper.data(recordset);
  }

  async findManyUser(param, sortParam = 1,fieldName = "fullname") {
    const payload = {
      where: param,
      attributes: ['userId', 'fullname'],
      order: [
        [fieldName, (sortParam == 1) ? 'ASC':'DESC'],
      ],
    };

    const recordset = await User.findAll(payload);
    return wrapper.responseDb(recordset);
  }
}

module.exports = Query;
