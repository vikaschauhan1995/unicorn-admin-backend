const express = require('express');
const { saveProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();


// save product
router.post('/', saveProduct);
router.get('/', getProducts);
router.patch('/', updateProduct);
router.delete('/:_id', deleteProduct);

module.exports = router;