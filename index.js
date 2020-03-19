const express = require('express');
const app = express();
const dotenv = require('dotenv');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-authentication'));
const cookieParser = require('cookie-parser');

// Routes
const authRoute = require('./routes/auth');
// const httpProxy = require('./routes/httpProxy');
dotenv.config();

// Middleware
// app.use('/*', httpProxy);
app.use(express.json());
app.use(cookieParser());

// Allow CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Route Middleware
app.use('/api/user', authRoute);

app.listen(3000);
