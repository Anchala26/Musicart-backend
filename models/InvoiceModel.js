const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  payment: {
    type: String,
    enum: ["Pay on Delivery", "UPI", "Card"],
    required: true,
  },
  orderTotal: {
    type: Number,
    required: true,
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      // required: true,
    },
  ],
});
const InvoiceModel = mongoose.model("Invoice", InvoiceSchema);

module.exports = InvoiceModel;
