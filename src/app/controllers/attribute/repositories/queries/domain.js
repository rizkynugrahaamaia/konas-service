
const Query = require('./query');
const Command = require('../commands/command');
const wrapper = require('../../../../helpers/utils/wrapper');
const { NotFoundError } = require('../../../../helpers/error');
const { Op } = require('sequelize');
const { v4:uuid } = require('uuid');

class Attribute {

  constructor(){
    this.query = new Query();
    this.command = new Command();
  }

  async viewManyRegions() {
    const getData = async () => this.query.findManyRegion();
    const region = await getData();
    if (region.data.length < 1) {
      const dataRegion = [
        "I PAPUA",
        "II PAPUA",
        "III PAPUA",
        "IV PAPUA",
        "INDONESIA TIMUR",
        "BALI NUSRA",
        "SULAWESI UTARA",
        "JAWA SUMATERA",
        "JAWA",
        "KALIMANTAN BARAT",
        "KALIMANTAN TIMUR",
        "KALIMANTAN UTARA",
        "KALIMANTAN TENGAH"
      ];

      for (let fullname of dataRegion) {
        const data = {
          fullname,
          regionId: uuid().toString()
        }

        await this.command.insertOneRegion(data);
      }

      
      const region = await getData();
      const { data } = region;
      return wrapper.data(data);
    }

    const { data } = region;
    return wrapper.data(data);
  }

  async viewManyRole() {
    let id = 100;
    const getData = async () => this.query.findManyRole();
    const role = await getData();
    if (role.data.length < 1) {
      const dataRegion = [
        "Super Admin",
        "Sekertaris",
        "Admin",
        "Formal",
        "Non Formal"
      ];

      for (let name of dataRegion) {
        const data = {
          roleId: uuid().toString(),
          name,
          type: (name == "Non Formal" || name == "Formal") ? "Peserta":"Admin"
        }

        await this.command.insertOneRole(data);
        id++
      }

      
      const role = await getData();
      const { data } = role;
      return wrapper.data(data);
    }

    const { data } = role;
    return wrapper.data(data);
  }

}

module.exports = Attribute;
