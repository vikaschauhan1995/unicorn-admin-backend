const express = require('express');
const { saveProduct, getProducts } = require('../controllers/productController');

const router = express.Router();


// save product
router.post('/', saveProduct);
router.get('/', getProducts);

module.exports = router;