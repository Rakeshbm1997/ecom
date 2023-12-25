// server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('productRoutes');

const app = express();
const PORT = process.env.API_PORT

// Connect to MongoDB
require('./config/database').connect(), {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/products', productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
