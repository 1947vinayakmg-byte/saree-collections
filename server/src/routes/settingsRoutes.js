// Settings Routes
// src/routes/settingsRoutes.js

const express = require("express");

const router = express.Router();

const {
  getSettings,
  updateSettings,
} = require("../controllers/settingsController");

const protect = require("../middleware/authMiddleware");


// GET SETTINGS
router.get("/", getSettings);


// UPDATE SETTINGS (alias: frontend calls PUT /api/settings)
router.put(
  "/",
  protect,
  updateSettings
);

// UPDATE SETTINGS (old route kept for compatibility)
router.put(
  "/update",
  protect,
  updateSettings
);

module.exports = router;