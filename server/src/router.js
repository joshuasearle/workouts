const express = require('express');

const router = express.Router();
const { authenticateToken } = require('./auth');

router.post(
  '/create-user',
  require('./controllers/user-controllers/createUser')
);
router.post('/login', require('./controllers/login'));

router.use(authenticateToken);
router.post(
  '/exercise',
  require('./controllers/exercise-controllers/createExercise')
);
router.delete('/exercise', require('./controllers/removeExercise'));

module.exports = router;
