function checkExerciseId(req, res, next) {
  if (!req.user.exercises.includes(exerciseId)) {
    return res.status(400).send('No exercise with this id');
  }
  next();
}

function checkWorkoutId(req, res, next) {
  if (!req.user.workouts.includes(workoutId)) {
    return res.status(400).send('No workout with this id');
  }
  next();
}

module.exports = { checkExerciseId, checkWorkoutId };
