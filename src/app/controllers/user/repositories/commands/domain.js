
const Query = require('../queries/query');
const QueruAttribute = require('../../../attribute/repositories/queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const commonUtil = require('../../../../helpers/utils/common');
const { NotFoundError, ConflictError, UnauthorizedError } = require('../../../../helpers/error');
const { v4:uuid } = require('uuid');

const algorithm = 'aes-256-ctr';
const secretKey = 'Kon@s2024';

class User {

  constructor(){
    this.command = new Command();
    this.query = new Query();
    this.queryAttribute = new QueruAttribute();
  }

  async generateUser(payload) {
    const { username, fullname, roomMeet, flight, roomStay, region:regionId, status:roleId, photo, birthday } = payload;
    const user = await this.query.findOneUser({ username });
    if (user.data) {
      return wrapper.error(new ConflictError('username sudah digunakan'));
    }

    const dataRegion = await this.queryAttribute.findOneRegion({ regionId });
    if (dataRegion.err) {
      return wrapper.error(new NotFoundError('wilayah tidak ditemukan'));
    }

    const dataRole = await this.queryAttribute.findOneRole({ roleId });
    if (dataRole.err) {
      return wrapper.error(new NotFoundError('status peserta tidak ditemukan'));
    }

    const { fullname:region } = dataRegion.data;
    const { name:status } = dataRole.data;
    const password = await commonUtil.encrypt(username, algorithm, secretKey);
    const document = {
      userId: uuid().toString(),
      username,
      fullname,
      roomMeet,
      flight,
      roomStay,
      region,
      status,
      presence: false,
      password,
      updatedAt: null,
      photo,
      birthday
    };

    const {data:result} = await this.command.insertOneUser(document);
    delete result.password;
    return wrapper.data(result);
  }

  async updateDataUser(payload) {
    const { username, region:regionId, status:roleId } = payload;
    const user = await this.query.findOneUser({ username });
    if (user.err) {
      return wrapper.error(new ConflictError('peserta tidak ditemukan'));
    }

    const document = payload;
    if(regionId){
      const dataRegion = await this.queryAttribute.findOneRegion({ regionId });
      if (dataRegion.err) {
        return wrapper.error(new NotFoundError('wilayah tidak ditemukan'));
      }

      document.region = dataRegion.data.fullname;
    }

    if(roleId){
      const dataRole = await this.queryAttribute.findOneRole({ roleId });
      if (dataRole.err) {
        return wrapper.error(new NotFoundError('status peserta tidak ditemukan'));
      }

      document.status = dataRole.data.name;
    }

    const update = await this.command.updateOneUser({ username },document);
    if (update.err) {
      return wrapper.error(new ConflictError('gagal update peserta'));
    }

    return wrapper.data(null);
  }

  async updatePresenceUser(payload) {
    const { userId } = payload;
    const user = await this.query.findOneUser({ userId });
    if (user.err) {
      return wrapper.error(new ConflictError('peserta tidak ditemukan'));
    }

    if(user.data.presence == true){
      return wrapper.error(new ConflictError('peserta sudah absen'));
    }
    const document = {
      presence: true
    };
    
    const update = await this.command.updateOneUser({ userId },document);
    if (update.err) {
      return wrapper.error(new ConflictError('gagal absen peserta'));
    }

    return wrapper.data(null);
  }

  async deleteUser(payload) {
    const { userId } = payload;
    const user = await this.query.findOneUser({ userId });
    if (user.err) {
      return wrapper.error(new ConflictError('peserta tidak ditemukan'));
    }
    
    const update = await this.command.deleteOneUser({ userId });
    if (update.err) {
      return wrapper.error(new ConflictError('gagal hapus peserta'));
    }

    return wrapper.data(null);
  }

}

module.exports = User;
