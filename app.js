require('dotenv').config();
const express = require('express');
const userRoutes = require('./model/userRoutes');
const productRoutes=require('./model/productroutes');
const orderRoutes=require('./model/orderRoutes');
const cartRoutes=require('./model/cartRoutes');
const vendorRoutes=require('./model/vendorRoutes');
const buyerRoutes=require('./model/buyerRoutes');
const app=express()
const PORT = process.env.API_PORT
require('./config/database').connect()
app.use(express.json());





app.use('/user', userRoutes);
app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/cart',cartRoutes);
app.use('/vendor',vendorRoutes);
app.use('/buyer',buyerRoutes);
app.listen(PORT, ()=> console.log(`Project is running at ${PORT} port`));