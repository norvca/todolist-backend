import Router from 'express';
import { User } from '../model/User';

export const authRouter = Router();

authRouter.get('/', (req, res) => {
  res.json({ success: true });
});

// Register
authRouter.post('/register', async (req, res) => {
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
authRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  User.logIn(username, password)
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
authRouter.post('/changeusername', async (req, res) => {
  const { username, newusername } = req.body;
});
