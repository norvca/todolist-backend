import httpProxy from 'http-proxy';
import express from 'express';
import cors from 'cors';

import { authRouter } from './routes/auth';

const app = express();
app.use(cors());

app.all('*', (req, res, next) => {
  let token = req.get('X-Auth-CouchDB-Token');
  let dbName = req.get('X-CouchDB-dbName');
  console.log(`Token: ${token}`);

  const proxy = httpProxy.createProxyServer({
    target: `http://127.0.0.1:5984/${dbName}`,
  });

  req.headers['cookie'] = token;

  proxy.web(req, res);
});

app.use('/api/user', authRouter);

app.listen(4000);
