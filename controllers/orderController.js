const mongoose = require('mongoose');
const Order = require('../models/orderModel');
const { ORDER_CREATED_BY_ID, ORDER_CREATED_BY_EMAIL, ORDER_ORIGIN, ORDER_MODIFIED_LAST, ORDER_PRODUCTS, ORDER_STATUS, ORDER_STATUS_DISPATCHED, ORDER_STATUS_CREATED } = require('../models/orderModel/const');
const { updateProduct_sQuantity } = require('./productController');

const saveOrder = async (req, res) => {
  try {
    const { name, mobile, address, state, pin, products, created_by_id, created_by_email, origin } = req.body;
    const order = await Order.create({ name, mobile, address, state, pin, products, [ORDER_CREATED_BY_ID]: created_by_id, [ORDER_CREATED_BY_EMAIL]: created_by_email, [ORDER_ORIGIN]: origin });
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const updateOrder = async (req, res) => {
  try {
    const { _id, name, mobile, address, state, pin, products } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(400).json({ error: "Order id is invalid" });
    }
    const oldOrder = await Order.findOne({ _id });
    if (!oldOrder) {
      return res.status(404).json({ error: "Order not found" });
    }
    const newOrderData = {
      name, mobile, address, state, pin, products,
      [ORDER_MODIFIED_LAST]: new Date(),
    };
    const newOrder = await Order.findOneAndUpdate({ _id }, {
      ...newOrderData,
    }, { new: true });
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const deleteOrder = async (req, res) => {
  const _id = req.params._id;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Invalid Order Id" });
    }
    const order = await Order.findOneAndDelete({ _id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ [ORDER_STATUS]: ORDER_STATUS_CREATED }).sort({ [ORDER_MODIFIED_LAST]: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const getOrder = async (req, res) => {
  const _id = req.params._id;
  try {
    if (!mongoose.Types.ObjectId.isValid(_id)) {
      return res.status(404).json({ error: "Invalid Order Id" });
    }
    const order = await Order.findOne({ _id });
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

const proceedOrder = async (req, res) => {
  try {
    const order = req.body;
    const updatedProducts = await updateProduct_sQuantity(order?.[ORDER_PRODUCTS]);
    const updatedOrder = await Order.findOneAndUpdate({ _id: order?._id }, { [ORDER_STATUS]: ORDER_STATUS_DISPATCHED }, { new: true });
    // const updatedOrder = await Order.findOneAndUpdate({ _id: order?._id }, { [ORDER_STATUS]: ORDER_STATUS_CREATED });
    res.status(200).json({ updatedOrder, updatedProducts });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

module.exports = {
  saveOrder,
  updateOrder,
  deleteOrder,
  getOrders,
  getOrder,
  proceedOrder
};