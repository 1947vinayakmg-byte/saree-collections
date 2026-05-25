// Settings Model
// src/models/Settings.js

const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    shopName: {
      type: String,
    },

    whatsappNumber: {
      type: String,
    },

    instagramLink: {
      type: String,
    },

    facebookLink: {
      type: String,
    },

    paymentLink: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Settings",
  settingsSchema
);