const Product = require('../models/productModel');
const { PRODUCT_NAME, PRODUCT_SKU, PRODUCT_CREATED_BY_ID, PRODUCT_CREATED_BY_EMAIL, PRODUCT_MODIFIED_LAST } = require('../models/productModel/const.js');


const saveProduct = async (req, res) => {
  try {
    const { name, sku, created_by_id, created_by_email } = req.body;
    const product = await Product.create({ [PRODUCT_NAME]: name, [PRODUCT_SKU]: sku, [PRODUCT_CREATED_BY_ID]: created_by_id, [PRODUCT_CREATED_BY_EMAIL]: created_by_email });
    // console.log("product=>", product);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ [PRODUCT_MODIFIED_LAST]: -1 });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}


module.exports = {
  saveProduct,
  getProducts
};