const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
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
  allowedHeaders: ['Authorization', 'Content-Type', 'Accept', 'Origin', 'X-Requested-With'], // Header yang diizinkan
  exposedHeaders: ['Set-Cookie'], // Header yang diekspos
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Metode HTTP yang diizinkan
  preflightContinue: true, // Mengizinkan preflight request untuk metode selain GET dan POST
  optionsSuccessStatus: 204, // Status sukses untuk preflight request
  maxAge: 3600 // Durasi cache preflight request dalam detik
};

app.use(cors(corsOptions)); // Terapkan middleware CORS

// Tambahkan middleware untuk header tambahan
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Origin', req.headers.origin);
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept,Authorization');
  next();
});


app.use(cookieParser()); //Middleware untuk mengurai cookie dari request

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

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