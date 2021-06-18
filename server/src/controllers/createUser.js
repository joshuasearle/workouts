const bcrypt = require('bcrypt');
const User = require('../models/user');

async function createUser(req, res) {
  const { username, password } = req.body;
  try {
    hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username: username,
      password: hashedPassword,
      workouts: [],
    });
    await user.save();
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

module.exports = createUser;
