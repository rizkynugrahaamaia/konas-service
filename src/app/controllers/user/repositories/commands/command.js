const wrapper = require('../../../../helpers/utils/wrapper');
const db = require("../../../../models");
const User = db.user;

class Command {

  constructor(db) {
    this.db = db;
  }

  async insertOneUser(document) {
    const recordset = await User.create(document);
    return wrapper.responseDb(recordset);
  }

  async updateOneUser(parameter, document){
    const recordset = await User.update(
      document,
      {where: parameter}
    );

    return wrapper.responseDb(recordset);
  }

  async deleteOneUser(parameter){
    const recordset = await User.destroy({where: parameter});
    return wrapper.responseDb(recordset);
  }
}

module.exports = Command;
