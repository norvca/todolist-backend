const axios = require('axios');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('pouchdb-authentication'));

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
    return axios.post('http://localhost:5984/_session', {
      name: this.username,
      password: this.password
    });
  }
}

module.exports = User;
