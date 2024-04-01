const express = require("express");
const authMiddleware = require("../middleware/AuthMiddleware");
const router = express.Router();
const {
  addToCart,
  viewCart,
  checkout,
  getInvoice,
} = require("../controllers/CartController");

router.post("/cart/add", authMiddleware, addToCart);
router.get("/cart/view", authMiddleware, viewCart);
router.post("/checkout", authMiddleware, checkout);
router.get("/invoices", authMiddleware, getInvoice);

module.exports = router;
