const { default: mongoose } = require('mongoose');
const Product = require('../models/productModel');
const { PRODUCT_NAME, PRODUCT_SKU, PRODUCT_CREATED_BY_ID, PRODUCT_CREATED_BY_EMAIL, PRODUCT_MODIFIED_LAST, PRODUCT_QUANTITY, PRODUCT_PRICE } = require('../models/productModel/const.js');


const saveProduct = async (req, res) => {
  try {
    const { name, sku, quantity, price, created_by_id, created_by_email } = req.body;
    const oldProduct = await Product.findOne({ sku });
    if (oldProduct) {
      throw Error('Duplicate SKU');
    }
    const product = await Product.create({ [PRODUCT_NAME]: name, [PRODUCT_SKU]: sku, [PRODUCT_QUANTITY]: quantity, [PRODUCT_PRICE]: price, [PRODUCT_CREATED_BY_ID]: created_by_id, [PRODUCT_CREATED_BY_EMAIL]: created_by_email });
    // console.log("product=>", product);
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateProduct = async (req, res) => {
  try {
    const { _id, name, sku, quantity, price } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: 'Invalid id' });
    }
    const oldProduct = await Product.findOne({ _id });
    if (!oldProduct) {
      throw Error("Product id is invalid");
    }
    const newProductData = {
      name,
      sku,
      [PRODUCT_MODIFIED_LAST]: new Date(),
      quantity,
      price
    };
    const newProduct = await Product.findOneAndUpdate({ _id }, {
      ...newProductData
    }, { new: true });
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateProduct_sQuantity = async (products) => {
  if (!(products?.length > 0)) {
    throw Error("There is no product to be executed");
  }
  const product_ids = [];
  products.forEach((product) => {
    product_ids.push(product?._id);
  });
  // ! actual products are products which is being fetched from the database
  const actualProducts = await Product.find({ _id: { $in: product_ids } });
  actualProducts.forEach(product => {
    if (product?.[PRODUCT_QUANTITY] <= 0) {
      throw Error(`${product?.[PRODUCT_NAME]} does not have sufficient quantity`);
    }
  });
  let updatedActualProducts = [];
  products.forEach(async (product) => {
    const newProduct = await Product.findOneAndUpdate({ _id: product?._id }, { $inc: { [PRODUCT_QUANTITY]: -product?.[PRODUCT_QUANTITY] } }, { new: true });
    updatedActualProducts.push(newProduct);
  });
  return actualProducts;
}

const deleteProduct = async (req, res) => {
  const _id = req.params._id;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    res.status(404).json({ error: 'Invalid id' });
  }
  try {
    const product = await Product.findOneAndDelete({ _id });
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
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
  getProducts,
  updateProduct,
  deleteProduct,
  updateProduct_sQuantity
};