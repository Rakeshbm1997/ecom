const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const buyerSchema =Schema({
    name: {  type: String,  required: true, },
    cart: { type:Schema.Types.ObjectId,  ref: 'Cart', },
  });
  
  // Create a Buyer model based on the schema
  module.exports= mongoose.model('Buyer', buyerSchema);