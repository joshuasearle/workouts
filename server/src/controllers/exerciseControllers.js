const User = require('../models/user');
const Exercise = require('../models/exercise');
const Workout = require('../models/workout');

async function createExercise(req, res) {
  const { title, description, setCount, repCount, secondsBreak } = req.body;

  const exercise = new Exercise({
    title: title,
    description: description,
    setCount: setCount,
    repCount: repCount,
    secondsBreak: secondsBreak,
  });
  const saveExercisePromise = exercise.save();
  const updateUserPromise = User.findByIdAndUpdate(req.user._id, {
    $push: { exercises: exercise._id },
  });

  try {
    await Promise.all([saveExercisePromise, updateUserPromise]);
    res.status(201).json(exercise);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

async function removeExercise(req, res) {
  const { exerciseId } = req.body;
  const updateUserPromise = User.findByIdAndUpdate(req.user._id, {
    $pull: { exercises: exerciseId },
  });
  const removeExercisePromise = Exercise.deleteOne({ _id: exerciseId });
  const removeFromWorkoutsPromises = req.user.workouts.map((workoutId) => {
    Workout.findByIdAndUpdate(workoutId, {
      $pull: { exercises: exerciseId },
    });
  });
  try {
    await Promise.all([
      updateUserPromise,
      removeExercisePromise,
      ...removeFromWorkoutsPromises,
    ]);
    res.status(202).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

async function updateExercise(req, res) {
  const { exerciseId } = req.body;
  const bodyNames = [
    'title',
    'description',
    'setCount',
    'repCount',
    'secondsBreak',
  ];

  // Only add fields that are defined
  const updateObject = bodyNames.reduce((acc, bodyName) => {
    console.log(acc);
    const value = req.body[bodyName];
    if (value) acc[bodyName] = value;
    return acc;
  }, {});

  try {
    await Exercise.updateOne({ _id: exerciseId }, updateObject);
    res.status(202).json();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

async function duplicateExercise(req, res) {
  const { exerciseId } = req.body;
  const exercise = await Exercise.findById(exerciseId);
  req.body.title = exercise.title;
  req.body.description = exercise.description;
  req.body.setCount = exercise.setCount;
  req.body.repCount = exercise.repCount;
  req.body.secondsBreak = exercise.secondsBreak;
  return await createExercise(req, res);
}

module.exports = {
  createExercise,
  removeExercise,
  updateExercise,
  duplicateExercise,
};
