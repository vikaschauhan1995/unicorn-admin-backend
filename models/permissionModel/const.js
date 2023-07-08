const PERMISSION = 'permission';

const USER_ID = 'user_id';
const PERMISSIONS = 'permissions';


// permission keys
const PERMISSION_OBJ_KEY_KEY = 'key';
const PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY = 'componentToBeActive';
const PERMISSION_OBJ_DESCRIPTION_KEY = 'description';

// permissions
const ORDERS_FULL_PERMISSION = { [PERMISSION_OBJ_KEY_KEY]: 'orders_full_permission', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'orders', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Get full access of orders' };
const ORDERS_READ_PERMISSION = { [PERMISSION_OBJ_KEY_KEY]: 'orders_read_permission', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'orders', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Only see orders' };
const SUB_USER_FULL_ACCESS = { [PERMISSION_OBJ_KEY_KEY]: 'sub_user_full_access', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'subuser', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Get full access of sub user' };
const SUB_USER_READ_ACCESS = { [PERMISSION_OBJ_KEY_KEY]: 'sub_user_read_access', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'subuser', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Only see sub users' }

const PRODUCT_FULL_PERMISSION = { [PERMISSION_OBJ_KEY_KEY]: 'product_full_permission', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'product', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Get full access of product' };
const PRODUCT_READ_PERMISSION = { [PERMISSION_OBJ_KEY_KEY]: 'product_read_permission', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'product', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Only see products' };

const INVENTORY_FULL_PERMISSION = { [PERMISSION_OBJ_KEY_KEY]: 'inventory_full_permission', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'inventory', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Get full access of inventory' };
const INVENTORY_READ_PRMISSION = { [PERMISSION_OBJ_KEY_KEY]: 'inventory_read_permission', [PERMISSION_OBJ_COMPONENT_TO_BE_ACTIVE_KEY]: 'inventory', [PERMISSION_OBJ_DESCRIPTION_KEY]: 'Only see inventory' };


const allPermissions = [
  ORDERS_FULL_PERMISSION,
  ORDERS_READ_PERMISSION,
  SUB_USER_FULL_ACCESS,
  SUB_USER_READ_ACCESS,
  PRODUCT_FULL_PERMISSION,
  PRODUCT_READ_PERMISSION,
  INVENTORY_FULL_PERMISSION,
  INVENTORY_READ_PRMISSION
];

module.exports = {
  PERMISSIONS,
  USER_ID,
  allPermissions,
  PERMISSION
}