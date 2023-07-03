const mongoose = require('mongoose');
const {
  PRODUCT_NAME,
  PRODUCT_SKU,
  PRODUCT_QUANTITY,
  PRODUCT_IMAGES,
  PRODUCT_CREATED_BY_ID,
  PRODUCT_CREATED_BY_EMAIL,
  PRODUCT_CREATED_AT,
  PRODUCT_MODIFIED_LAST
} = require('./const');


const Schema = mongoose.Schema;


const productSchema = new Schema({
  [PRODUCT_NAME]: {
    type: String,
    required: true
  },
  [PRODUCT_SKU]: {
    type: String,
    required: true,
    unique: true
  },
  [PRODUCT_QUANTITY]: {
    type: Number,
    min: 0
  },
  [PRODUCT_IMAGES]: {
    type: [String],
  },
  [PRODUCT_CREATED_BY_ID]: {
    type: String,
    required: true
  },
  [PRODUCT_CREATED_BY_EMAIL]: {
    type: String,
    required: true
  },
  [PRODUCT_CREATED_AT]: {
    type: Date,
    default: Date.now
  },
  [PRODUCT_MODIFIED_LAST]: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', productSchema);