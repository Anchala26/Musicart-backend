const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  type: String,
  image: [String],
  brand: String,
  colour: String,
  price: Number,
  description: String,
  overview: String,
  availability: String,
});
const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
