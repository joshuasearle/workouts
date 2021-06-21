const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateAccessToken } = require('../auth');

async function createUser(req, res) {
  const { username, password } = req.body;
  try {
    const usersFound = await User.find({ username });
    const usernameExists = usersFound.length !== 0;
    if (usernameExists) {
      return res.status(400).send('Username already exists');
    }
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

async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).json('Cannot find user');
  try {
    const correctPassword = await bcrypt.compare(password, user.password);
    if (correctPassword) {
      const token = generateAccessToken(username);
      return res.status(200).json(token);
    }
    // No point not improving usability as knowing if username is correct is vulnerable to timing attack
    return res.status(400).json('Incorrect password');
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

async function getUserData(req, res) {
  return res.status(200).json(req.user);
}

module.exports = { loginUser, createUser, getUserData };
