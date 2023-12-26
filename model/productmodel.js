const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
 

  title: { type: String, required: true, },

   imagePath: {  type: String, required: true,},

  description: { type: String, required: true, },

  price: { type: Number,required: true, },

  category: { type: String,  required: true,},
  
  inventory:{type:Number,required:true},
});

module.exports = mongoose.model("Product", productSchema);