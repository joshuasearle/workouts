const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  title: String,
  description: String,
  setCount: Number,
  repCount: Number,
  secondsBreak: Number,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

exports = Exercise;
