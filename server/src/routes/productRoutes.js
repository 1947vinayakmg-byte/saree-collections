// Product Routes
// src/routes/productRoutes.js

const express = require("express");
const router = express.Router();

const {
  getProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");


// GET ALL PRODUCTS
router.get("/", getProducts);

// GET SINGLE PRODUCT BY ID (needed for Edit page)
router.get("/:id", getProductById);

// ADD PRODUCT — accepts JSON body with image URL
router.post("/", protect, addProduct);

// UPDATE PRODUCT — frontend calls PUT /api/products/:id
router.put("/:id", protect, updateProduct);

// DELETE PRODUCT — frontend calls DELETE /api/products/:id
router.delete("/:id", protect, deleteProduct);


// Keep old routes as aliases so nothing breaks
router.post("/add", protect, addProduct);
router.put("/update/:id", protect, updateProduct);
router.delete("/delete/:id", protect, deleteProduct);

module.exports = router;