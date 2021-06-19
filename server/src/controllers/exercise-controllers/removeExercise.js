const User = require('../models/user');
const Exercise = require('../models/exercise');

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

module.exports = removeExercise;
