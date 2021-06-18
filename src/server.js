const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const defaultPort = 5000;
const port = process.env.PORT || defaultPort;
const app = express();

app.use('/', (req, res) => {
  res.status(200).send();
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
