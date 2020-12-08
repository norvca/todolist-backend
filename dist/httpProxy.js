"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_proxy_1 = __importDefault(require("http-proxy"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_1 = require("./routes/auth");
const app = express_1.default();
app.use(cors_1.default());
app.all('*', (req, res, next) => {
    let token = req.get('X-Auth-CouchDB-Token');
    let dbName = req.get('X-CouchDB-dbName');
    console.log(`Token: ${token}`);
    const proxy = http_proxy_1.default.createProxyServer({
        target: `http://127.0.0.1:5984/${dbName}`,
    });
    req.headers['cookie'] = token;
    proxy.web(req, res);
});
app.use('/api/user', auth_1.authRouter);
app.listen(4000);
