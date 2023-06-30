const mongoose = require('mongoose');
const { PERMISSIONS, USER_ID } = require('./const');
const { USER } = require('../userModel/const');

const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  // [USER_ID]: {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  [PERMISSIONS]: {
    type: [{}],
    required: true,
  }
  // [USER]: [{ type: Schema.Types.ObjectId, ref: "User" }]
});

module.exports = mongoose.model('Permission', permissionSchema);