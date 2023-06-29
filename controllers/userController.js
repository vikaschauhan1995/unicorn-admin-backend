const User = require('../models/userModel');
const Permission = require('../models/permissionModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getPermissions, setPermission } = require('./permissionController');
const { PASSWORD, USER_TYPE } = require('../models/userModel/const');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 });
}

const findUserType = async (_id) => {
  const userType = await User.findOne({ _id }).select(`${USER_TYPE}`);
  return userType?.[USER_TYPE];
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const permissions = await getPermissions(user._id);
    res.status(200).json({ email, token, permissions, _id: user._id });
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
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


const getSubusers = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const userType = await findUserType(user_id);
    if (userType === "root") {
      const subusers = await User.find({ [USER_TYPE]: "subuser" }).select(`-${PASSWORD}`);
      res.status(200).json(subusers);
    } else if (userType === "subuser") {
      const subusers = await User.find({ [USER_TYPE]: "subuser" }).where({ "_id": { $ne: user_id } }).select(`-${PASSWORD}`);
      res.status(200).json(subusers);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteSubuser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    // console.log("user_id: =>", user_id);
    const user = await User.findOneAndDelete({ _id: user_id });
    const permission = await Permission.findOneAndDelete({ user_id });
    res.status(200).json({ user, permission });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  loginUser,
  signupUser,
  createSubuser,
  getSubusers,
  deleteSubuser
}