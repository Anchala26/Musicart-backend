const express = require("express");
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");
const Invoice = require("../models/InvoiceModel");

const addToCart = async (req, res) => {
  const { productId } = req.body;
  const userId = req.userId;
  //   console.log(userId);

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    // Add the product to the user's cart
    user.cart.push(product._id);
    await user.save();

    res.json({ message: "Product added to cart successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const viewCart = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).populate("cart");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user.cart);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// const checkout = async (req, res) => {
//   const userId = req.userId;
//   const { address, payment } = req.body; // Assuming you're sending address, payment, and cart from the frontend

//   try {
//     // Create a new invoice document
//     const invoice = new InvoiceModel({
//       address,
//       payment,
//     });

//     // Save the invoice to the database
//     await invoice.save();

//     res.json({ message: "Invoice created successfully", invoice });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
const checkout = async (req, res) => {
  const userId = req.userId;
  const { username, address, payment, orderTotal, productIds } = req.body;

  try {
    // Create a new invoice document
    const invoice = new Invoice({
      username: username,
      address: address,
      payment: payment,
      orderTotal: orderTotal,
      products: productIds,
    });

    // Save the invoice to the database
    await invoice.save();

    res.json({ message: "Invoice created successfully", invoice });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getInvoice = async (req, res) => {
  try {
    const invoices = await Invoice.find({ userId: req.userId });
    res.json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  addToCart,
  viewCart,
  checkout,
  getInvoice,
};
