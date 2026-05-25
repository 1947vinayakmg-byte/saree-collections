// Response Handler Utility
// src/utils/responseHandler.js

const successResponse = (
  res,
  message,
  data = {}
) => {
  return res.status(200).json({
    success: true,
    message,
    ...data,
  });
};

const errorResponse = (
  res,
  message
) => {
  return res.status(500).json({
    success: false,
    message,
  });
};

module.exports = {
  successResponse,
  errorResponse,
};