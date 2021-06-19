const express = require('express');

const router = express.Router();
const { authenticateToken } = require('./auth');

router.post('/create-user', require('./controllers/createUser'));
router.post('/login', require('./controllers/login'));

router.post(
  '/exercise',
  authenticateToken,
  require('./controllers/createExercise')
);

module.exports = router;
