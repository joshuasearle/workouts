const express = require('express');

const router = express.Router();

// User routes
const userControllers = require('./controllers/userControllers');
const { createUser, loginUser } = userControllers;

router.post('/create-user', createUser);
router.post('/login', loginUser);

// All other routes require authentication
const { authenticateToken } = require('./auth');

router.use(authenticateToken);

// Exercise routes
const exerciseControllers = require('./controllers/exerciseControllers');
const { createExercise, removeExercise, updateExercise, duplicateExercise } =
  exerciseControllers;

router.post('/exercises', createExercise);
router.put('/exercises', updateExercise);
router.delete('/exercises', removeExercise);
router.post('/duplicate-exercise', duplicateExercise);

module.exports = router;
