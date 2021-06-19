const express = require('express');

const router = express.Router();

// Checkers
const checkers = require('./controllers/checkers');
const { checkExerciseId, checkWorkoutId } = checkers;

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
router.put('/exercises', checkExerciseId, updateExercise);
router.delete('/exercises', checkExerciseId, removeExercise);
router.post('/duplicate-exercise', checkExerciseId, duplicateExercise);

// Workshop routes
const workoutControllers = require('./controllers/workoutControllers');
const {
  createWorkout,
  removeWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
} = workoutControllers;

router.post('/workouts', createWorkout);
router.delete('/workouts', checkWorkoutId, removeWorkout);
router.post(
  '/workouts/add-exercise',
  checkExerciseId,
  checkWorkoutId,
  addExerciseToWorkout
);
router.post(
  '/workouts/remove-exercise',
  checkWorkoutId,
  checkExerciseId,
  removeExerciseFromWorkout
);

module.exports = router;
