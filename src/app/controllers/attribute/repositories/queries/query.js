const wrapper = require('../../../../helpers/utils/wrapper');
const db = require("../../../../models");
const Region = db.region;
const Role = db.role;
const { Op } = require('sequelize');

class Query {
  async findOneRegion(parameter) {
    const payload = {
      where: parameter
    };

    const recordset = await Region.findOne(payload);
    return wrapper.responseDb(recordset);
  }

  async findManyRegion(fieldName = "id", sortParam = 1,) {
    const payload = {
      attributes: ['regionId', 'fullname'],
      order: [
        [fieldName, (sortParam == 1) ? 'ASC':'DESC'],
      ],
    };

    const recordset = await Region.findAll(payload);
    return wrapper.responseDb(recordset);
  }

  async findOneRole(parameter) {
    const payload = {
      where: parameter
    };

    const recordset = await Role.findOne(payload);
    return wrapper.responseDb(recordset);
  }
  
  async findManyRole(fieldName = "id", sortParam = 1,) {
    const payload = {
      where: { type: { [Op.not]: "Admin"}},
      attributes: ['roleId', 'name'],
      order: [
        [fieldName, (sortParam == 1) ? 'ASC':'DESC'],
      ],
    };

    const recordset = await Role.findAll(payload);
    return wrapper.responseDb(recordset);
  }

}

module.exports = Query;
