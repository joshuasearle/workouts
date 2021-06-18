const bcrypt = require('bcrypt');
const User = require('../models/user');

async function loginUser(req, res) {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) return res.status(400).send('Cannot find user');
  try {
    if (await bcrypt.compare(password, user.password)) res.send('Success');
    // No point not improving usability as knowing if username is correct is vulnerable to timing attack
    return res.status(400).send('Incorrect password');
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
}

module.exports = loginUser;
