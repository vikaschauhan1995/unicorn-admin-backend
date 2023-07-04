const mongoose = require('mongoose');
const {
  ORDER_NAME,
  ORDER_MOBILE,
  ORDER_ADDRESS,
  ORDER_STATE,
  ORDER_PIN,
  ORDER_PRODUCTS,
  ORDER_CREATED_BY_ID,
  ORDER_CREATED_BY_EMAIL,
  ORDER_ORIGIN,
  ORDER_CREATED_AT,
  ORDER_MODIFIED_LAST,
  CUSTOM_ORDER_GENERATE_KEY,
  PROGRAM_ORDER_GENERATE_KEY
} = require('./const');

const Schema = mongoose.Schema;


const orderSchema = new Schema({
  [ORDER_NAME]: {
    type: String,
    required: true
  },
  [ORDER_MOBILE]: {
    type: Number,
    required: true
  },
  [ORDER_ADDRESS]: {
    type: String,
    required: true
  },
  [ORDER_STATE]: {
    type: String,
    required: true
  },
  [ORDER_PIN]: {
    type: Number,
    required: true
  },
  [ORDER_PRODUCTS]: {
    type: [{ type: Schema.Types.ObjectId, req: 'Product' }],
    required: true
  },
  [ORDER_CREATED_BY_ID]: {
    type: String,
    required: true
  },
  [ORDER_CREATED_BY_EMAIL]: {
    type: String,
    required: true
  },
  [ORDER_ORIGIN]: {
    type: String,
    required: true,
    enum: [CUSTOM_ORDER_GENERATE_KEY, PROGRAM_ORDER_GENERATE_KEY]
  },
  [ORDER_CREATED_AT]: {
    type: Date,
    required: true,
    default: Date.now
  },
  [ORDER_MODIFIED_LAST]: {
    type: Date,
    required: true,
    default: Date.now
  },
});

module.exports = mongoose.model('Order', orderSchema);