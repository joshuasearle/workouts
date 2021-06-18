const express = require('express');

const port = 5000;
const app = express();

app.use('/', (req, res) => {
  res.status(200).send();
});

app.listen(port, () => {
  console.log('Listening on port 5000');
});
