// Upload Controller
// src/controllers/uploadController.js

const cloudinary = require("../config/cloudinary");

const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) {
      return res.status(400).json({
        success: false,
        message: "No image provided.",
      });
    }

    // Upload base64 image directly to Cloudinary
    const result = await cloudinary.uploader.upload(image, {
      folder: "saree_products",
      resource_type: "image",
    });

    res.status(200).json({
      success: true,
      imageUrl: result.secure_url,
      message: "Image uploaded successfully!",
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed: " + error.message,
    });
  }
};

module.exports = { uploadImage };
