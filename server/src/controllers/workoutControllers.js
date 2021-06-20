const User = require('../models/user');
const Workout = require('../models/workout');

async function createWorkout(req, res) {
  const { title, description } = req.body;
  const workout = new Workout({
    title,
    description,
    exercises: [],
  });

  const saveWorkoutPromise = workout.save();
  const updateUserPromise = User.findByIdAndUpdate(req.user._id, {
    $push: { workouts: workout._id },
  });

  try {
    await Promise.all([saveWorkoutPromise, updateUserPromise]);
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

async function removeWorkout(req, res) {
  const { workoutId } = req.body;

  const updateUserPromise = User.findByIdAndUpdate(req.user._id, {
    $pull: { workouts: workoutId },
  });

  const removeWorkoutPromise = Workout.deleteOne({ _id: workoutId });

  try {
    await Promise.all([updateUserPromise, removeWorkoutPromise]);
    res.status(202).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

async function addExerciseToWorkout(req, res) {
  const { exerciseId, workoutId } = req.body;

  try {
    await Workout.findByIdAndUpdate(workoutId, {
      $push: { exercises: exerciseId },
    });
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

async function removeExerciseFromWorkout(req, res) {
  const { exerciseId, workoutId } = req.body;
  try {
    await Workout.findByIdAndUpdate(workoutId, {
      $pull: { exercises: exerciseId },
    });
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

module.exports = {
  createWorkout,
  removeWorkout,
  addExerciseToWorkout,
  removeExerciseFromWorkout,
};
