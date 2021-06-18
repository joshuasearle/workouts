const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  title: String,
  description: String,
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
});

const Workout = mongoose.model('Workout', workoutSchema);

exports = Workout;
