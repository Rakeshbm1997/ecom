// order.js

const express = require('express');
const router = express.Router();
const formidable = require('express-formidable')
require('../config/database').connect()
const Order=require('./ordermodel')

// Get all orders
router.get('/',formidable(), async (req, res) => {
  try {
    const orders = await Order.findOne().populate('product');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific order by ID
router.get('/:orderId',formidable(), async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findById(orderId).populate('product');
    if (!order) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(order);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new order
router.post('/', async (req, res) => {
  const { product, quantity } = req.fields;
  try {
    const newOrder = new Order({ product, quantity });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update an order by ID
router.put('/:orderId',formidable(), async (req, res) => {
  const orderId = req.params.orderId;
  const { product, quantity } = req.fields;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(orderId, { product, quantity }, { new: true }).populate('product');
    if (!updatedOrder) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(updatedOrder);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete an order by ID
router.delete('/:orderId',formidable(), async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const deletedOrder = await Order.findByIdAndRemove(orderId).populate('product');
    if (!deletedOrder) {
      res.status(404).json({ error: 'Order not found' });
    } else {
      res.json(deletedOrder);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
