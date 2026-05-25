// Express app setup
// src/app.js

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const settingsRoutes = require("./routes/settingsRoutes");

const { uploadImage } = require("./controllers/uploadController");
const protect = require("./middleware/authMiddleware");

const errorHandler = require("./middleware/errorMiddleware");

const app = express();


// MIDDLEWARES
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:5173",
    "http://localhost:5174",
    "https://saree-collections-two.vercel.app",
    "https://saree-collections-lekn.vercel.app"
  ],
  credentials: true,
}));
app.use(express.json({ limit: "50mb" })); // 50mb to allow base64 image uploads
app.use(express.urlencoded({ limit: "50mb", extended: true }));


// STATIC FOLDER
app.use(
  "/uploads",
  express.static("src/uploads")
);


// ROOT ROUTE
app.get("/", (req, res) => {
  res.send("API Running Successfully");
});


// ROUTES
app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/settings", settingsRoutes);

// UPLOAD ROUTE (Protected — base64 → Cloudinary)
app.post("/api/upload", protect, uploadImage);


// ERROR HANDLER
app.use(errorHandler);

module.exports = app;