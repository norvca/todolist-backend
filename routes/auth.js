const express = require('express');
const router = express.Router();
const User = require('../model/User');
const PouchDB = require('pouchdb');

router.get('/', (req, res) => {
  res.json({ success: true });
});

// Register
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;
  const user = new User(username, password, email);

  try {
    const resData = await user.signUp();
    res.json({ success: true, data: resData });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = new User(username, password);

  user
    .logIn()
    .then(response => {
      const authToken = response.headers['set-cookie'][0];
      res
        .status(200)
        .json({ success: true, data: response.data, token: authToken });
    })
    .catch(err => {
      res.status(404).json(err);
    });
});

// Change username
router.post('/changeusername', async (req, res) => {
  const { username, newusername } = req.body;
});

module.exports = router;
