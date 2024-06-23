
const Query = require('./query');
const QueryAttribute = require('../../../attribute/repositories/queries/query');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError, UnauthorizedError } = require('../../../../helpers/error');
const { Op } = require('sequelize');
const XLSX = require('xlsx');

class User {

  constructor(){
    this.query = new Query();
    this.queryAttribute = new QueryAttribute();
  }

  async viewUser(userId) {
    const param = { userId }
    const user = await this.query.findOneUser(param);
    if (user.err) {
      return wrapper.error(new NotFoundError('Can not find user'));
    }
    const { data } = user;
    return wrapper.data(data);
  }

  async viewListUser(payload) {
    const { search, region:regionId, status:roleId, presence, csv } = payload;
    const size = (csv) ? -1:(parseInt(payload.size)) ? parseInt(payload.size):10;
    const page = (size < 0) ? 0:(parseInt(payload.page)) ? (parseInt(payload.page)-1)*size:0;
    let param = { status: { [Op.not]: "Super Admin"} };
    if(search) {
      param.username = { [Op.like]: `%${search}%`};
    }

    if(regionId) {
      const {data} = await this.queryAttribute.findOneRegion({ regionId });
      param.region = data.fullname;
    }

    if(roleId) {
      const {data} = await this.queryAttribute.findOneRole({ roleId });
      param.status = data.name;
    }

    if(presence == 'true' || presence == 'false') {
      param.presence = (presence == 'true') ? true:false;
    }

    const retrieveCount = await this.query.countUser(param);
    const { data:totalData } = retrieveCount;
    const retrieveData = await this.query.findListUser("username", (size < 0) ? totalData:size, page, param);
    const { data } = retrieveData;
    
    if(csv) {
      const sheetName='sheet 1';
      const workSheet = XLSX.utils.json_to_sheet(data);
      const workBook = XLSX.utils.book_new();
      const workBookOpt = { bookType:'xlsx', bookSST:false, type:'base64' };

      XLSX.utils.book_append_sheet(workBook, workSheet, sheetName);

      const xlsxBase64 = XLSX.write(workBook,workBookOpt);
      return wrapper.paginationData(xlsxBase64,null);
    }
    const meta = {
      page: parseInt(payload.page),
      totalPage: (size < 0) ? 1:Math.ceil(totalData / size),
      totalData,
      totalDataOnPage: data.length
    }
    return wrapper.paginationData(data,meta);
  }

}

module.exports = User;
