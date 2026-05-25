// src/services/productService.js

const Product = require("../models/Product");

const getAllProducts = async () => {
  return await Product.find();
};

const createProduct = async (productData) => {
  const newProduct = new Product(productData);
  return await newProduct.save();
};

const updateProductById = async (id, updateData) => {
  return await Product.findByIdAndUpdate(
    id,
    updateData,
    { new: true }
  );
};

const deleteProductById = async (id) => {
  return await Product.findByIdAndDelete(id);
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProductById,
  deleteProductById,
};