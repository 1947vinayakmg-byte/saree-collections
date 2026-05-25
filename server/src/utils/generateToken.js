// Generate Token Utility
// src/utils/generateToken.js

const jwt = require("jsonwebtoken");

const generateToken = (data) => {
  return jwt.sign(
    data,
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateToken;