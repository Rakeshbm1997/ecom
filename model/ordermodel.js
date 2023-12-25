const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = Schema({
  
 product: { type:Schema.Types.ObjectId, ref: 'Product', required: true,},

  quantity: { type: Number,required: true,},
  // address: { type: String, required: true, },
  // orderDate: { type: Date, default: Date.now,},
  // Delivered: { type: Boolean,  default: false,},
});

module.exports = mongoose.model("Order", orderSchema);