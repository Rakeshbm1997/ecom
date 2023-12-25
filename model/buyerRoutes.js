// buyer.js

const express = require('express');
require('../config/database').connect()
const router = express.Router();
const Buyer=require('./buyermodel')

router.get('/', async (req, res) => {
  try {
    const buyers = await Buyer.findOne().populate('cart');
    res.json(buyers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific buyer by ID
router.get('/:buyerId', async (req, res) => {
  const buyerId = req.params.buyerId;
  try {
    const buyer = await Buyer.findById(buyerId).populate('cart');
    if (!buyer) {
      res.status(404).json({ error: 'Buyer not found' });
    } else {
      res.json(buyer);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new buyer
router.post('/', async (req, res) => {
  const { name, cart } = req.fields;
  try {
    const newBuyer = new Buyer({ name, cart });
    await newBuyer.save();
    res.status(201).json(newBuyer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a buyer by ID
router.put('/:buyerId', async (req, res) => {
  const buyerId = req.params.buyerId;
  const { name, cart } = req.fields;
  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(buyerId, { name, cart }, { new: true }).populate('cart');
    if (!updatedBuyer) {
      res.status(404).json({ error: 'Buyer not found' });
    } else {
      res.json(updatedBuyer);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a buyer by ID
router.delete('/:buyerId', async (req, res) => {
  const buyerId = req.params.buyerId;
  try {
    const deletedBuyer = await Buyer.findByIdAndRemove(buyerId).populate('cart');
    if (!deletedBuyer) {
      res.status(404).json({ error: 'Buyer not found' });
    } else {
      res.json(deletedBuyer);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
