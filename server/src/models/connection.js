const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect('mongodb://mongo:27017/workouts', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected'));
