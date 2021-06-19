const User = require('../../models/user');
const Exercise = require('../../models/exercise');

async function createExercise(req, res) {
  const { title, description, setCount, repCount, secondsBreak } = req.body;
  try {
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
    await Promise.all([saveExercisePromise, updateUserPromise]);
    res.status(201).json(exercise);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

async function removeExercise(req, res) {
  const { exerciseId } = req.body;
  try {
    const removeUserExercisePromise = User.findByIdAndUpdate(req.user._id, {
      $pull: { exercises: exerciseId },
    });
    const removeExercisePromise = Exercise.deleteOne({ _id: exerciseId });
    await Promise.all([removeExercisePromise, removeUserExercisePromise]);
    res.status(202).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

async function createExercise(req, res) {
  const { exerciseId, title, description, setCount, repCount, secondsBreak } =
    req.body;
  try {
    await Exercise.updateOne(
      { _id: exerciseId },
      { title, description, setCount, repCount, secondsBreak }
    );
    res.status(201).json(exercise);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

module.exports = { createExercise, removeExercise, createExercise };
