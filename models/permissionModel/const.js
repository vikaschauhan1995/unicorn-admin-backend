const USER_ID = 'user_id';
const PERMISSIONS = 'permissions';

// permission keys
const PERMISSION_OBJ_KEY_KEY = 'key';
const PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY = 'componentToBeActive';
const PERMISSION_OBJ_DESCRIPTION_KEY = 'description';

// permissions
const ORDERS_FULL_PERMISSION = { [PERMISSION_OBJ_KEY_KEY]: 'orders_full_permission', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'order', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Get full access of orders' };
const ORDERS_READ_PERMISSION = { [PERMISSION_OBJ_KEY_KEY]: 'orders_read_permission', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'order', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Only see orders' };
const SUB_USER_FULL_ACCESS = { [PERMISSION_OBJ_KEY_KEY]: 'sub_user_full_access', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'subuser', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Get full access of sub user' };
const SUB_USER_READ_ACCESS = { [PERMISSION_OBJ_KEY_KEY]: 'sub_user_read_access', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'subuser', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Only see sub users' }

const allPermissions = [
  ORDERS_FULL_PERMISSION,
  ORDERS_READ_PERMISSION,
  SUB_USER_FULL_ACCESS,
  SUB_USER_READ_ACCESS
];

module.exports = {
  PERMISSIONS,
  USER_ID,
  allPermissions
}