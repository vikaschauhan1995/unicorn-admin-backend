const Permission = require('../models/permissionModel');
const { USER_ID, PERMISSIONS } = require('../models/permissionModel/const.js');

const setPermission = async (user_id, permissions) => {
  try {
    await Permission.create({ [USER_ID]: user_id, [PERMISSIONS]: permissions })
  } catch (error) {
    throw Error("Erorr while creating permission(s)");
  }
}

const getPermissions = async (user_id) => {
  var permissionObj = await Permission.findOne({ [USER_ID]: user_id });
  const permissions = permissionObj?.[PERMISSIONS] ? permissionObj?.[PERMISSIONS] : [];
  return { _id: permissionObj?._id, [PERMISSIONS]: permissions };
}

module.exports = {
  setPermission,
  getPermissions
}