
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const { Op } = require('sequelize');

class User {

  constructor(){
    this.query = new Query();
  }

  async viewUser(userId) {
    const param = { username: "wyferion"}
    const user = await this.query.findOneUser(param);
    if (user.err) {
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    const { data } = user;
    return wrapper.data(data);
  }

  async viewListUser(payload) {
    const { search } = payload;
    const size = (parseInt(payload.size)) ? parseInt(payload.size):10;
    const page = (parseInt(payload.page)) ? (parseInt(payload.page)-1)*size:0;
    let param = {};
    if(search) {
      param = { username: { [Op.like]: `%${search}%`}}
    }

    const retrieveCount = await this.query.countUser(param);
    const retrieveData = await this.query.findListUser("username", size, page, param);
    const { data } = retrieveData;
    const { data:totalData } = retrieveCount;
    const meta = {
      page: parseInt(payload.page),
      totalPage: Math.ceil(totalData / size),
      totalData,
      totalDataOnPage: data.length
    }
    return wrapper.paginationData(data,meta);
  }

}

module.exports = User;
