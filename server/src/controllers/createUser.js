const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateAccessToken } = require('../auth');

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
    const token = generateAccessToken(username);
    res.status(201).json(token);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

module.exports = createUser;