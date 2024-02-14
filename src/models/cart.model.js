const mongoose = require("mongoose");
const cartsCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
    quantity: { type: Number, default: 1 }, _id: false
}]
});

const cartModel = mongoose.model(cartsCollection, cartSchema);

module.exports = cartModel;



  