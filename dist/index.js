"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const pouchdb_1 = __importDefault(require("pouchdb"));
const pouchdb_authentication_1 = __importDefault(require("pouchdb-authentication"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = express_1.default();
pouchdb_1.default.plugin(pouchdb_authentication_1.default);
// Routes
const { authRouter } = require('./routes/auth');
// const httpProxy = require('./routes/httpProxy');
dotenv_1.default.config();
// Middleware
// app.use('/*', httpProxy);
app.use(express_1.default.json());
app.use(cookie_parser_1.default());
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
