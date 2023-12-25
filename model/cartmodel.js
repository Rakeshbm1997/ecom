const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cartSchema = Schema({
    user: { type: Schema.Types.ObjectId,  ref: "user",required: true, },
    products: [
        {
          product: {
            type:Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
          },
        },
      ],
     order: { type: Schema.Types.ObjectId,  ref: "order", },

});



module.exports = mongoose.model("Cart", cartSchema);