const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { EMAIL, PASSWORD, USER_TYPE, ROOT_USER } = require('./const.js');
const Permission = require('../permissionModel')
const { PERMISSIONS, PERMISSION, USER_ID, allPermissions } = require('../permissionModel/const.js');
const { setPermission } = require('../../controllers/permissionController.js');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  [EMAIL]: {
    type: String,
    required: true,
    unique: true
  },
  [PASSWORD]: {
    type: String,
    required: true,
  },
  [USER_TYPE]: {
    type: String,
    required: true
  },
  [PERMISSIONS]: [{ type: Schema.Types.ObjectId, ref: "Permission" }]
});

userSchema.statics.signup = async function (email, password) {
  // email and password vadation
  if (!email || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid');
  }
  // if (!validator.isStrongPassword(password)) {
  //   throw Error('Password is not strong');
  // }

  const isRootExists = await this.findOne({ [USER_TYPE]: ROOT_USER });
  if (isRootExists) {
    throw Error(`"${ROOT_USER}" user already exists!`);
  }

  const userExists = await this.findOne({ email });
  if (userExists) {
    throw Error('Email already in use');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create permissions
  const permissions = await setPermission(allPermissions);

  const user = await this.create({ email, password: hash, [USER_TYPE]: ROOT_USER, [PERMISSIONS]: permissions._id });

  return user;
}

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw Error('Incorrect email');
  }
  const pMatch = await bcrypt.compare(password, user.password);
  if (!pMatch) {
    throw Error('Invalid password');
  }
  return user;
}

module.exports = mongoose.model('User', userSchema);