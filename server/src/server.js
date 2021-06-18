const express = require('express');
const dotenv = require('dotenv');

require('./models/connection');
const User = require('./models/user');

dotenv.config();
const defaultPort = 5000;
const port = process.env.PORT || defaultPort;
const app = express();

app.get('/health', (req, res) => {
  res.status(200).send();
});

app.get('/users', async (req, res) => {
  const users = await User.find({});
  console.log(users);
  res.send(users);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
