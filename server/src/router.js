const express = require('express');

const router = express.Router();

router.post('/create-user', require('./controllers/createUser'));
router.post('/login', require('./controllers/login'));

module.exports = router;
