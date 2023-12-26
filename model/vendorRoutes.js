
const express = require('express');
const router = express.Router();
require('../config/database').connect()
const Vendor=require('./vendormodel')



router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.findOne().populate('product');
    res.json(vendors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific vendor by ID
router.get('/:vendorId', async (req, res) => {
  const vendorId = req.params.vendorId;
  try {
    const vendor = await Vendor.findById(vendorId).populate('product');
    if (!vendor) {
      res.status(404).json({ error: 'Vendor not found' });
    } else {
      res.json(vendor);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new vendor
router.post('/', async (req, res) => {
  const { name, product } = req.body;
  try {
    const newVendor = new Vendor({ name, product });
    await newVendor.save();
    res.status(201).json(newVendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a vendor by ID
router.put('/:vendorId', async (req, res) => {
  const vendorId = req.params.vendorId;
  const { name, product } = req.body;
  try {
    const updatedVendor = await Vendor.findByIdAndUpdate(vendorId, { name, product }, { new: true }).populate('product');
    if (!updatedVendor) {
      res.status(404).json({ error: 'Vendor not found' });
    } else {
      res.json(updatedVendor);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a vendor by ID
router.delete('/:vendorId', async (req, res) => {
  const vendorId = req.params.vendorId;
  try {
    const deletedVendor = await Vendor.findByIdAndRemove(vendorId).populate('product');
    if (!deletedVendor) {
      res.status(404).json({ error: 'Vendor not found' });
    } else {
      res.json(deletedVendor);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
