const mongoose = require("mongoose");
const usersCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  email: { type: String, required: true, index: true, unique: true },
  age: { type: Number },
  password: { type: String },
  role: { type: String, default: "user" },
  cart: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
});

const userModel = mongoose.model(usersCollection, userSchema);

module.exports = userModel;
