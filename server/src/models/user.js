const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
});

const User = mongoose.model('User', userSchema);

const user = new User({
  username: 'username',
  password: 'password',
  workouts: [],
});

module.exports = User;
