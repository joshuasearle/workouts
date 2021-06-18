const express = require('express');
const dotenv = require('dotenv');

require('./models/connection');
const User = require('./models/user');

require('./auth');

dotenv.config();
const defaultPort = 5000;
const port = process.env.PORT || defaultPort;
const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).send();
});

app.get('/users', async (req, res) => {
  const users = await User.find({});
  // console.log(users);
  res.send(users);
});

app.post('/users', async (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
  });
  await user.save();
  res.status(201).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
