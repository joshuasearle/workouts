const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
  exercises: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Exercise' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
