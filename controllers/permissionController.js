const Permission = require('../models/permissionModel');
const { USER_ID, PERMISSIONS } = require('../models/permissionModel/const.js');

const setPermission = async (user_id, permissions) => {
  try {
    await Permission.create({ [USER_ID]: user_id, [PERMISSIONS]: permissions })
  } catch (error) {
    throw Error("Erorr while creating permission(s)");
  }
}

module.exports = {
  setPermission
}