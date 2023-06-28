const USER_ID = 'user_id';
const PERMISSIONS = 'permissions';

// permissions
const ORDERS_FULL_PERMISSION = { key: 'orders_full_permission', componentToBeActive: 'order', description: 'Get full access of orders' };
const ORDERS_READ_PERMISSION = { key: 'orders_read_permission', componentToBeActive: 'order', description: 'Only see orders' };
const SUB_USER_FULL_ACCESS = { key: 'sub_user_full_access', componentToBeActive: 'subuser', description: 'Get full access of sub user' };
const SUB_USER_READ_ACCESS = { key: 'sub_user_read_access', componentToBeActive: 'subuser', description: 'Only see sub users' }

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