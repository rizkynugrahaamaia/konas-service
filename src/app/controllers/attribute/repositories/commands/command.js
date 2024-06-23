const wrapper = require('../../../../helpers/utils/wrapper');
const db = require("../../../../models");
const Region = db.region;
const Role = db.role;

class Command {

  constructor() {
  }

  async insertOneRegion(document) {
    const recordset = await Region.create(document);
    return wrapper.responseDb(recordset);
  }
  async insertOneRole(document) {
    const recordset = await Role.create(document);
    return wrapper.responseDb(recordset);
  }

}

module.exports = Command;
