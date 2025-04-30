const express = require("express");
const cors = require("cors");
// const cookieParser = require('cookie-parser');
require('dotenv').config();
const basicAuth = require('../app/middleware/basicAuth');

const app = express();

// Konfigurasi CORS
const corsOptions = {
  origin: function(origin, callback) {
    const allowedOrigins = [
      process.env.WEB_URL,
      'http://localhost:3000'
    ]; // Domain yang diizinkan
    
    // Mengizinkan request tanpa origin (seperti mobile apps atau curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Metode HTTP yang diizinkan
  allowedHeaders: [
    'Authorization',
    'Content-Type',
    'Accept',
    'Origin',
    'X-Requested-With'
  ]// Header yang diizinkan
};

// Terapkan middleware CORS
app.use(cors(corsOptions));

// Cookie parser dengan secret key
// app.use(cookieParser(process.env.JWT_SECRET));

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Basic auth initialization
app.use(basicAuth.init());

// Database connection
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