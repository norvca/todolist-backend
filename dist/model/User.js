"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const axios_1 = __importDefault(require("axios"));
const pouchdb_1 = __importDefault(require("pouchdb"));
const pouchdb_authentication_1 = __importDefault(require("pouchdb-authentication"));
const dotenv_1 = __importDefault(require("dotenv"));
pouchdb_1.default.plugin(pouchdb_authentication_1.default);
dotenv_1.default.config();
// Database
var db = new pouchdb_1.default('http://admin:couchjj@localhost:5984', {
    skip_setup: true,
});
class User {
    constructor(username, password, email) {
        this.username = username;
        this.password = password;
        this.email = email;
    }
    signUp() {
        return db.signUp(this.username, this.password, {
            metadata: {
                email: this.email,
            },
        });
    }
    logIn() {
        return axios_1.default.post(process.env.DB_SESSION, {
            name: this.username,
            password: this.password,
        });
    }
    changeUsername() {
        console.log(123);
        // return db.changeUsername(username, newusername);
    }
}
exports.User = User;
