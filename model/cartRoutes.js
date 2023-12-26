
const express = require('express');
const router = express.Router();
require('../config/database').connect()
const Cart=require('./cartmodel')


// Get all carts
router.get('/', async (req, res) => {
  try {
    const carts = await Cart.findOne().populate('user').populate('products.product');
    res.json(carts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific cart by ID
router.get('/:cartId', async (req, res) => {
  const cartId = req.params.cartId;
  try {
    const cart = await Cart.findById(cartId).populate('user').populate('products.product');
    if (!cart) {
      res.status(404).json({ error: 'Cart not found' });
    } else {
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new cart
router.post('/', async (req, res) => {
  const { user, products } = req.body;
  try {
    const newCart = new Cart({ user, products });
    await newCart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//add an item to the cart
router.post('/addToCart', (req, res) => {
  const productId = req.body.productId;

  const product = getProductById(productId);

  if (product && product.inventory > 0) {
    product.inventory--;
    
    Cart.push(product);
    
    res.json({ message: 'Product added to cart', Cart });
  } else {
    res.status(404).json({ message: 'Product not found or out of stock' });
  }
});

// Update a cart by ID
router.put('/:cartId', async (req, res) => {
  const cartId = req.params.cartId;
  const { user, products } = req.body;
  try {
    const updatedCart = await Cart.findByIdAndUpdate(cartId, { user, products }, { new: true }).populate('user').populate('products.product');
    if (!updatedCart) {
      res.status(404).json({ error: 'Cart not found' });
    } else {
      res.json(updatedCart);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a cart by ID
router.delete('/:cartId', async (req, res) => {
  const cartId = req.params.cartId;
  try {
    const deletedCart = await Cart.findByIdAndRemove(cartId).populate('user').populate('products.product');
    if (!deletedCart) {
      res.status(404).json({ error: 'Cart not found' });
    } else {
      res.json(deletedCart);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
