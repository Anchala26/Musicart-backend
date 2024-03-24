const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getProductById,
  addProduct,
  filterProducts,
  ProductModel,
} = require("../controllers/ProductController");

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", addProduct);
router.get("/filter", filterProducts);

module.exports = router;
