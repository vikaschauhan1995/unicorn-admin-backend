const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { getPermissions } = require('./permissionController');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 });
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const permissions = await getPermissions(user._id);
    res.status(200).json({ email, token, permissions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const signupUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.signup(email, password);
    const token = createToken(user._id);
    const permissions = await getPermissions(user._id);
    res.status(200).json({ email, token, permissions });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  loginUser,
  signupUser
}