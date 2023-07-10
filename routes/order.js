const express = require('express');
const { saveOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getOrder,
  proceedOrder,
  getAllDeliveredOrders
} = require('../controllers/orderController');

const router = express.Router();


router.get('/delivered', getAllDeliveredOrders);
router.post('/', saveOrder);
router.get('/', getOrders);
router.patch('/', updateOrder);
router.delete('/:_id', deleteOrder);
router.get('/:_id', getOrder);
router.patch('/proceed', proceedOrder);

module.exports = router;