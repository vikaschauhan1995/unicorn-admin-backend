const express = require('express');
const { saveOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getOrder
} = require('../controllers/orderController');

const router = express.Router();


router.post('/', saveOrder);
router.get('/', getOrders);
router.patch('/', updateOrder);
router.delete('/:_id', deleteOrder);
router.get('/:_id', getOrder);

module.exports = router;