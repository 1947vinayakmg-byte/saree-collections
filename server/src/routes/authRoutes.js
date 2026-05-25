// Auth Routes
// src/routes/authRoutes.js

const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  getMe,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");

// LOGIN ROUTE
router.post("/login", loginAdmin);

// GET ME ROUTE
router.get("/me", protect, getMe);

module.exports = router;