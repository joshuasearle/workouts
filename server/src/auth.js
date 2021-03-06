const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

function generateAccessToken(username) {
  return jwt.sign({ username }, process.env.TOKEN_SECRET, {
    expiresIn: '2000h',
  });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.status(401).send();
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, userToken) => {
    if (err) return res.status(403).send();
    const user = await User.findOne({ username: userToken.username })
      .populate('exercises')
      .populate('workouts')
      .populate({
        path: 'workouts',
        populate: {
          path: 'exercises',
          model: 'Exercise',
        },
      });

    if (!user) return res.status(401).send();
    // Workaround
    // Don't know how to remove field from mongoose object
    user['password'] = null;
    req.user = user;
    next();
  });
}

module.exports = { generateAccessToken, authenticateToken };
