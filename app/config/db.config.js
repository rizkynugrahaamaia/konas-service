module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "konas_api_db",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
  // mysql -u root -p konas_api_db -h localhost