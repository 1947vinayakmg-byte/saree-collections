// src/controllers/productController.js

const Product = require("../models/Product");

const {
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
} = require("../services/productService");


// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GET SINGLE PRODUCT BY ID (for Edit page)
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ADD PRODUCT
// Accepts JSON body: { name, description, price, category, stockStatus, image }
// The image field is a URL string (already uploaded to Cloudinary via /api/upload)
const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, stockStatus, image } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({ success: false, message: "Name, price and category are required." });
    }

    const newProduct = new Product({
      name,
      description: description || "",
      price: Number(price),
      category,
      stockStatus: stockStatus || "In Stock",
      // Store as array to match the Product schema's images field
      images: image ? [image] : [],
    });

    await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product Added",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const { name, description, price, category, stockStatus, image } = req.body;

    const updateData = {
      ...(name && { name }),
      ...(description !== undefined && { description }),
      ...(price && { price: Number(price) }),
      ...(category && { category }),
      ...(stockStatus && { stockStatus }),
      ...(image && { images: [image] }),
    };

    const updated = await updateProductById(req.params.id, updateData);

    if (!updated) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated",
      product: updated,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// DELETE PRODUCT
const deleteProduct = async (req, res) => {
  try {
    const deleted = await deleteProductById(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};