const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config()
const basicAuth = require('../app/middleware/basicAuth');

const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(
//   cookieSession({
//     name: "konas-session",
//     keys: ["COOKIE_SECRET"], // should use as secret environment variable
//     httpOnly: true,
//     sameSite: 'strict',
//     signed: false,
//     path: '/api/auth/signin',
//     expires: new Date(new Date().getTime() + 100 * 1000),
//   })
// );

app.use(cookieParser());
app.use(basicAuth.init());

const db = require("./models");
db.sequelize.sync()
.then(() => {
  console.log('Connection has been established successfully.');
}).catch(err => {
  console.error('Unable to connect to the database:', err);
 });
// db.sequelize.sync({force: true}).then(() => {
//   console.log('Drop and Resync Db');
//   initial();
// });

// simple route
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/attribute.routes')(app);
require('./routes/vote.routes')(app);
app.get("/", (req, res) => {
  res.json({ message: "Welcome to konas application v2." });
});


module.exports = app;