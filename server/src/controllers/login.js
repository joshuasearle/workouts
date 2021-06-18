const bcrypt = require('bcrypt');
const User = require('../models/user');
const { generateAccessToken } = require('../auth');

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

module.exports = loginUser;
