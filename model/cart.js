const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const cartSchema = Schema({

    productId: { type: mongoose.Schema.Types.ObjectId,  ref: "Product", },
    user: { type: Schema.Types.ObjectId,  ref: "user", },
    order: { type: Schema.Types.ObjectId,  ref: "order", },

});



module.exports = mongoose.model("cart", cartSchema);