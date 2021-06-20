function checkExerciseId(req, res, next) {
  const { exerciseId } = req.body;
  if (!req.user.exercises.map((e) => e._id).includes(exerciseId)) {
    return res.status(400).send('No exercise with this id');
  }
  next();
}

function checkWorkoutId(req, res, next) {
  const { workoutId } = req.body;
  if (!req.user.workouts.map((w) => w._id).includes(workoutId)) {
    return res.status(400).send('No workout with this id');
  }
  next();
}

module.exports = { checkExerciseId, checkWorkoutId };
