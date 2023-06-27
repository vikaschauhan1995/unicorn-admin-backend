const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const { EMAIL, PASSWORD } = require('./const.js');

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
  }
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

  const userExists = await this.findOne({ email });
  if (userExists) {
    throw Error('Email already in use');
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({ email, password: hash });

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