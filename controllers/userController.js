const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getPermissions, setPermission } = require('./permissionController');
const { PASSWORD, USER_TYPE } = require('../models/userModel/const');

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

const createSubuser = async (req, res) => {
  try {
    const { email, password, permissions, user_type } = req.body;
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw Error('Email already in use');
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({ email, [PASSWORD]: hash, [USER_TYPE]: user_type });

    // create permissions
    await setPermission(user._id, permissions);

    // console.log("email, password, permissions=>", email, password, permissions);
    res.status(200).json({});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  loginUser,
  signupUser,
  createSubuser
}