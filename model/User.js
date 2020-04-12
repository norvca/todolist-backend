const axios = require('axios');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-authentication'));
require('dotenv').config();

// Database
var db = new PouchDB('http://admin:couchjj@localhost:5984', {
  skip_setup: true
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
        email: this.email
      }
    });
  }

  logIn() {
    return axios.post(process.env.DB_SESSION, {
      name: this.username,
      password: this.password
    });
  }
}

module.exports = User;
