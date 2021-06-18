const express = require('express');
const dotenv = require('dotenv');

require('./models/connection');

require('./auth');
const router = require('./router');

dotenv.config();
const port = 5000;
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

app.use(router);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
