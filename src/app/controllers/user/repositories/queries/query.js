const wrapper = require('../../../../helpers/utils/wrapper');
const db = require("../../../../models");
const User = db.user;

class Query {

  //Function ini digunakan untuk mencari data user berdasarkan parameter yang diberikan.
  async findOneUser(parameter) {

    //payload adalah objek yang berisi parameter pencarian untuk mencari data user.
    const payload = {
      where: parameter
    };
    
    // Menggunakan metode findOne dari model User untuk mencari satu data user 
    // yang sesuai dengan parameter yang diberikan.
    const recordset = await User.findOne(payload);

    // memproses hasil dari operasi database (result) dan 
    // mengembalikan objek respons dengan format tertentu.
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
}

module.exports = Query;
