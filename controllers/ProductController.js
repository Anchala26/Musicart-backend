const ProductModel = require("../models/ProductModel");

//for adding products
async function addProduct(req, res) {
  try {
    const {
      name,
      type,
      image,
      brand,
      colour,
      price,
      description,
      overview,
      availability,
    } = req.body;

    //creating new product instance
    const newProduct = new ProductModel({
      name,
      type,
      image,
      brand,
      colour,
      price,
      description,
      overview,
      availability,
    });
    await newProduct.save();

    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to add", error: error.message });
  }
}
//get all products
async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.find();
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
}

//get single product

async function getProductById(req, res) {
  const productId = req.params.id;

  try {
    const product = await ProductModel.findById(productId);

    res.json(product);
  } catch (error) {
    res.status(500).json(error);
  }
}

//filter

async function filterProducts(req, res) {
  try {
    const { type, brand, colour, price } = req.query;
    let query = {};

    if (type) {
      query.type = type;
    }
    if (brand) {
      query.brand = brand;
    }
    if (colour) {
      query.colour = colour;
    }
    if (price) {
      let [min, max] = [0, 0];
      switch (price) {
        case "¤0 - ¤1,000":
          min = 0;
          max = 1000;
          break;
        case "¤1,000 - ¤10,000":
          min = 1000;
          max = 10000;
          break;
        case "¤10,000 - ¤20,000":
          min = 10000;
          max = 20000;
          break;
        default:
          break;
      }
      query.price = { $gte: min, $lte: max };
    }
    const filteredProducts = await ProductModel.find(query);
    res.json(filteredProducts);
  } catch (err) {
    res.json(err);
  }
}

module.exports = {
  addProduct,
  getAllProducts,
  getProductById,
  filterProducts,
  ProductModel,
};
