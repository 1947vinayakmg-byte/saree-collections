// Settings Controller
// src/controllers/settingsController.js

const Settings = require("../models/Settings");


// GET SETTINGS
const getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne();

    res.status(200).json(settings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE SETTINGS
const updateSettings = async (req, res) => {
  try {
    const updated = await Settings.findOneAndUpdate(
      {},
      req.body,
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      settings: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSettings,
  updateSettings,
};