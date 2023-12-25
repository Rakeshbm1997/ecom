// productRoutes.js

const express = require('express');
const formidable = require('express-formidable')
require('../config/database').connect()
const router = express.Router();
const Product=require('./productmodel')




// Route to get all products
router.get('/', formidable(), async (req, res) => {
  try {
    const products = await Product.findOne();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get a specific product by ID
router.get('/:productId',formidable(), async (req, res) => {
  const productId = req.params.productId;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to create a new product
router.post('/', formidable(),async (req, res) => {
  const { title, price, description } = req.fields;

  try {
    const newProduct = new Product({ title, price, description });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } 
  catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Route to update a product by ID
router.put('/:productId',formidable(), async (req, res) => {
  const productId = req.params.productId;
  const { title, price, description } = req.fields;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { title, price, description },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(400).json({ error: 'Bad Request' });
  }
});

// Route to delete a product by ID
router.delete('/:productId',formidable(), async (req, res) => {
  const productId = req.params.productId;

  try {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
