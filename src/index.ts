import express from 'express';
import dotenv from 'dotenv';
import PouchDB from 'pouchdb';
import pouchAuth from 'pouchdb-authentication';
import cookieParser from 'cookie-parser';

const app = express();
PouchDB.plugin(pouchAuth);

// Routes
const { authRouter } = require('./routes/auth');
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
app.use('/api/user', authRouter);

app.listen(3000);
