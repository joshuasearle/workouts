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
const { createExercise, removeExercise, updateExercise } = exerciseControllers;

router.post('/exercise', createExercise);
router.put('/exercise', updateExercise);
router.delete('/exercise', removeExercise);

module.exports = router;
