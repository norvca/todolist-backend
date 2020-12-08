import axios from 'axios';
import PouchDB from 'pouchdb';
import pouchdbAuthentication from 'pouchdb-authentication';
import dotenv from 'dotenv';

PouchDB.plugin(pouchdbAuthentication);
dotenv.config();

// Database
var db = new PouchDB('http://admin:couchjj@localhost:5984', {
  skip_setup: true,
});

export class User {
  constructor(
    private username: string,
    private password: string,
    private email: string
  ) {}

  signUp() {
    return db.signUp(this.username, this.password, {
      metadata: {
        email: this.email,
      },
    });
  }

  static logIn(name: string, password: string) {
    return axios.post(process.env.DB_SESSION, {
      name,
      password,
    });
  }

  changeUsername() {
    console.log(123);
    // return db.changeUsername(username, newusername);
  }
}
