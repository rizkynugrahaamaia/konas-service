const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
require('dotenv').config();
const basicAuth = require('../app/middleware/basicAuth');

const app = express();

// Konfigurasi CORS
const corsOptions = {
  origin: process.env.WEB_URL, // Domain yang diizinkan
  credentials: true, // Mengizinkan pengiriman cookie lintas domain
  allowedHeaders: ['Authorization', 'Content-Type', 'Accept'], // Header yang diizinkan
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Metode HTTP yang diizinkan
};

app.use(cors(corsOptions)); // Terapkan middleware CORS

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Initialize cookie-parser
app.use(cookieParser());

app.use(basicAuth.init());

const db = require("./models");
db.sequelize.sync()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/attribute.routes')(app);
require('./routes/vote.routes')(app);

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to konas application v2." });
});

module.exports = app;