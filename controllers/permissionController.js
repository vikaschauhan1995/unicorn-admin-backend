const Permission = require('../models/permissionModel');
const { USER_ID, PERMISSIONS, allPermissions } = require('../models/permissionModel/const.js');
const { USER } = require('../models/userModel/const');

const setPermission = async (permissions) => {
  try {
    const permissions_ = await Permission.create({ [PERMISSIONS]: permissions })
    return permissions_;
  } catch (error) {
    throw Error(`Erorr while creating permission(s) :`);
  }
}

const getPermissions = async (_id) => {
  const permissionObj = await Permission.findOne({ _id: _id });
  // console.log("_id, permissionObj", _id, permissionObj);
  const permissions = permissionObj?.[PERMISSIONS] ? permissionObj?.[PERMISSIONS] : [];
  return { _id: permissionObj?._id, [PERMISSIONS]: permissions };
}

const getAllPermissions = (req, res) => {
  res.status(200).json(allPermissions);
}

module.exports = {
  setPermission,
  getPermissions,
  getAllPermissions
}