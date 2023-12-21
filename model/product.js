const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
  productCode: { type: String, required: true, unique: true,},

  title: { type: String, required: true, },

  imagePath: {  type: String, required: true,},

  description: { type: String, required: true, },

  price: { type: Number,required: true, },

  category: { type: String,  required: true,},
  
  available: {   type: Boolean, required: true, },

  manufacturingDate: {type: Date, default: Date.now,},
});

module.exports = mongoose.model("Product", productSchema);