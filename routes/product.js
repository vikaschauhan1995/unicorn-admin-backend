const express = require('express');
const saveProduct = require('../controllers/productController');

const router = express.Router();


// save product
router.post('/', saveProduct);

module.exports = router;