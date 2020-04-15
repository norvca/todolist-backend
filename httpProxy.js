const http = require('http');
const httpProxy = require('http-proxy');
const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors());

const authRoute = require('./routes/auth');

app.all('*', (req, res, next) => {
  let token = req.get('X-Auth-CouchDB-Token');
  let dbName = req.get('X-CouchDB-dbName');
  console.log(`Token: ${token}`);

  const proxy = httpProxy.createProxyServer({
    target: `http://127.0.0.1:5984/${dbName}`
  });

  req.headers['cookie'] = token;

  proxy.web(req, res);
});

app.use('/api/user', authRoute);

app.listen(4000);
