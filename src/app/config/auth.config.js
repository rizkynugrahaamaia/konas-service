module.exports = {
  secret: "konas-secret-key",
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD,
    }
  ]
};