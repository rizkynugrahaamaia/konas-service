module.exports = {
  secret: process.env.JWT_SECRET,
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD,
    }
  ]
};