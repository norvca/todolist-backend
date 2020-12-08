"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const User_1 = require("../model/User");
exports.authRouter = express_1.default();
exports.authRouter.get('/', (req, res) => {
    res.json({ success: true });
});
// Register
exports.authRouter.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    const user = new User_1.User(username, password, email);
    try {
        const resData = await user.signUp();
        res.json({ success: true, data: resData });
    }
    catch (err) {
        res.status(400).json(err);
    }
});
// Login
exports.authRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    User_1.User.logIn(username, password)
        .then((response) => {
        const authToken = response.headers['set-cookie'][0];
        res
            .status(200)
            .json({ success: true, data: response.data, token: authToken });
    })
        .catch((err) => {
        res.status(404).json(err);
    });
});
// Change username
exports.authRouter.post('/changeusername', async (req, res) => {
    const { username, newusername } = req.body;
});
