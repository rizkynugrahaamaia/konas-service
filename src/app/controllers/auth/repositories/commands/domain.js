const QueryUser = require('../../../user/repositories/queries/query');
const QueryAttribute = require('../../../attribute/repositories/queries/query');
const CommandUser = require('../../../user/repositories/commands/command');
const wrapper = require('../../../../helpers/utils/wrapper');
const commonUtil = require('../../../../helpers/utils/common');
const { NotFoundError, UnauthorizedError, ConflictError } = require('../../../../helpers/error');
const config = require("../../../../config/auth.config");
const jwt = require("jsonwebtoken");
const { v4:uuid } = require('uuid');

const algorithm = 'aes-256-ctr';
const secretKey = 'Kon@s2024';

class Auth {

  constructor(){
    this.commandUser = new CommandUser();
    this.queryUser = new QueryUser();
    this.queryAttribute = new QueryAttribute();
  }

  async generateCredential(payload) {
    return jwt.sign(payload, config.secret,{ algorithm: 'HS256', allowInsecureKeySizes: true, expiresIn: 86400, });
  }

  async register(payload) {
    const { username, password:pass, fullname, region:regionId, status:roleId, birthday } = payload;
    const retrieveUser = await this.queryUser.findOneUser({ username });
    if (retrieveUser.data) {
      return wrapper.error(new ConflictError('user already exist'));
    }

    const dataRegion = await this.queryAttribute.findOneRegion({ regionId });
    if (dataRegion.err) {
      return wrapper.error(new NotFoundError('wilayah tidak ditemukan'));
    }

    const dataRole = await this.queryAttribute.findOneRole((roleId == "Super Admin" || roleId == "Sekertaris" || roleId == "Admin") ? { name: roleId }:{ roleId });
    if (dataRole.err) {
      return wrapper.error(new NotFoundError('status peserta tidak ditemukan'));
    }

    const { fullname:region } = dataRegion.data;
    const { name:status } = dataRole.data;
    const password = await commonUtil.encrypt(pass, algorithm, secretKey);
    const data = {
      userId: uuid().toString(),
      username,
      fullname,
      region,
      status,
      presence: false,
      password,
      birthday
    };

    const { data:result } = await this.commandUser.insertOneUser(data);
    delete result.password;
    return wrapper.data(data);

  }

  async signIn(payload) {
    const { username, password } = payload;
    const user = await this.queryUser.findOneUser({ username });
    if(user.err){
      return wrapper.error(new NotFoundError('user tidak ditemukan'));
    }

    const { password:valid, userId, status:role, region, fullname } = user.data;
    
    if (password !== await commonUtil.decrypt(valid, algorithm, secretKey)){
      return wrapper.error(new UnauthorizedError('password salah'));
    }

    const token = await this.generateCredential({userId, role})
    const data = {
      token,
      info: {
        fullname,
        username,
        region,
        role,
      }
    }

    return wrapper.data(data);
  }

}

module.exports = Auth;
