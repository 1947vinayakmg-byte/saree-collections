import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer } from "vite";

const app = express();
const PORT = 3000;

// Setup directories for database and uploads
const DATA_DIR = path.join(process.cwd(), "data");
const DB_FILE = path.join(DATA_DIR, "db.json");
const UPLOADS_DIR = path.join(process.cwd(), "uploads");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

// Enable rich JSON bodies with a high limit (50mb) for base64 image uploads
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// Serve uploaded images statically
app.use("/uploads", express.static(UPLOADS_DIR));

// Default settings seed
const DEFAULT_SETTINGS = {
  shopName: "demo saree",
  whatsappNumber: "+919876543210",
  instagramLink: "https://instagram.com/vastra_sarees",
  facebookLink: "https://facebook.com/vastrasarees",
  paymentLink: "https://upi.link/vastrademo-web@upi",
};

// Default products seed
const DEFAULT_PRODUCTS = [
  {
    id: "prod-1",
    name: "Kanchipuram Golden Brocade Silk Saree",
    description: "An elegant pure silk saree featuring beautiful golden zari brocade weave on the border and pallu. Perfect for weddings and major festivals.",
    price: 8500,
    category: "Silk Saree",
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(), // 5 days ago
  },
  {
    id: "prod-2",
    name: "Banarasi Crimson Georgette Saree",
    description: "Breathable georgette body paired with masterfully crafted Banarasi silver booti work. Lightweight and comfortable for evening galas.",
    price: 6200,
    category: "Georgette Saree",
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(), // 3 days ago
  },
  {
    id: "prod-3",
    name: "Classic Mint Green Chanderi Cotton Saree",
    description: "Beautiful cotton silk blend exhibiting block prints and absolute pastel charm. Ideal for formal office wear and casual high teas.",
    price: 2450,
    category: "Cotton Saree",
    stockStatus: "Low Stock",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date(Date.now() - 3600000 * 24 * 10).toISOString(), // 10 days ago
  },
  {
    id: "prod-4",
    name: "Midnight Indigo Designer Linen Saree",
    description: "Premium pure organic linen base decorated with custom silver thread embroidery on raw borders. Minimalist elegance personified.",
    price: 3800,
    category: "Linen Saree",
    stockStatus: "In Stock",
    image: "https://images.unsplash.com/photo-1609357518652-6cf0416f0cbe?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(), // 12 hours ago
  },
  {
    id: "prod-5",
    name: "Traditional Handloom Sambalpuri Ikat",
    description: "Traditional Orissa double ikat weaving pattern crafted on heavy mercerized cotton. Features shell motifs and striking red contrasts.",
    price: 4900,
    category: "Cotton Saree",
    stockStatus: "Out of Stock",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date(Date.now() - 3600000 * 24 * 20).toISOString(),
  }
];

// Read database file helper
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initialData = { products: DEFAULT_PRODUCTS, settings: DEFAULT_SETTINGS };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), "utf8");
      return initialData;
    }
    const data = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading database file:", error);
    return { products: DEFAULT_PRODUCTS, settings: DEFAULT_SETTINGS };
  }
}

// Write database file helper
function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (error) {
    console.error("Error writing database file:", error);
  }
}

// Admin mock credentials
const ADMIN_USER = {
  email: "admin@shop.com",
  password: "admin123", // Easy for beginner shop owners
  token: "shop-admin-token-secure-secret-2026",
};

// Authentication Middleware
const requireAuth = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. Authentication required." });
  }
  const token = authHeader.split(" ")[1];
  if (token !== ADMIN_USER.token) {
    return res.status(403).json({ message: "Invalid or expired session token." });
  }
  next();
};

/* --- REST API ENDPOINTS --- */

// 1. Admin Login API
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide both email and password." });
  }

  if (email.toLowerCase() === ADMIN_USER.email && password === ADMIN_USER.password) {
    return res.json({
      success: true,
      token: ADMIN_USER.token,
      user: { email: ADMIN_USER.email, role: "admin" },
      message: "Login successful!"
    });
  }

  return res.status(401).json({ message: "Invalid email or password." });
});

// Verify state endpoint (checks token validity)
app.get("/api/auth/me", requireAuth, (req, res) => {
  res.json({ success: true, user: { email: ADMIN_USER.email, role: "admin" } });
});

// 2. Get Shop Settings API
app.get("/api/settings", (req, res) => {
  const db = readDB();
  res.json(db.settings || DEFAULT_SETTINGS);
});

// Update Shop Settings API (Protected)
app.put("/api/settings", requireAuth, (req, res) => {
  const db = readDB();
  const newSettings = { ...db.settings, ...req.body };
  db.settings = newSettings;
  writeDB(db);
  res.json({ message: "Settings updated successfully!", settings: newSettings });
});

// 3. Products CRUD APIs
// GET all products (with optional search filter)
app.get("/api/products", (req, res) => {
  const db = readDB();
  const search = req.query.search ? String(req.query.search).toLowerCase().trim() : "";

  let result = db.products || [];

  if (search) {
    result = result.filter((p: any) =>
      p.name.toLowerCase().includes(search) ||
      p.category.toLowerCase().includes(search) ||
      p.description.toLowerCase().includes(search)
    );
  }

  // Sort by createdAt descending
  result.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  res.json(result);
});

// GET unique product
app.get("/api/products/:id", (req, res) => {
  const db = readDB();
  const product = db.products.find((p: any) => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// CREATE / Add Product API (Protected)
app.post("/api/products", requireAuth, (req, res) => {
  const db = readDB();
  const { name, description, price, category, stockStatus, image } = req.body;

  if (!name || isNaN(Number(price)) || !category || !stockStatus) {
    return res.status(400).json({ message: "Missing required product fields." });
  }

  const newProduct = {
    id: "prod-" + Date.now(),
    name,
    description: description || "",
    price: Number(price),
    category,
    stockStatus,
    image: image || "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
    createdAt: new Date().toISOString()
  };

  db.products.push(newProduct);
  writeDB(db);

  res.status(201).json({ message: "Product added successfully!", product: newProduct });
});

// UPDATE / Edit Product API (Protected)
app.put("/api/products/:id", requireAuth, (req, res) => {
  const db = readDB();
  const index = db.products.findIndex((p: any) => p.id === req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found." });
  }

  const existingProduct = db.products[index];
  const { name, description, price, category, stockStatus, image } = req.body;

  const updatedProduct = {
    ...existingProduct,
    name: name !== undefined ? name : existingProduct.name,
    description: description !== undefined ? description : existingProduct.description,
    price: price !== undefined ? Number(price) : existingProduct.price,
    category: category !== undefined ? category : existingProduct.category,
    stockStatus: stockStatus !== undefined ? stockStatus : existingProduct.stockStatus,
    image: image !== undefined ? image : existingProduct.image,
  };

  db.products[index] = updatedProduct;
  writeDB(db);

  res.json({ message: "Product updated successfully!", product: updatedProduct });
});

// DELETE Product API (Protected)
app.delete("/api/products/:id", requireAuth, (req, res) => {
  const db = readDB();
  const initialCount = db.products.length;
  db.products = db.products.filter((p: any) => p.id !== req.params.id);

  if (db.products.length === initialCount) {
    return res.status(404).json({ message: "Product not found or already deleted." });
  }

  writeDB(db);
  res.json({ message: "Product deleted successfully!" });
});

// 4. Custom Local Image Upload Router (Protected)
// Upload base64 encoding to images
app.post("/api/upload", requireAuth, (req, res) => {
  const { image } = req.body; // Expect base64 encoded string

  if (!image) {
    return res.status(400).json({ message: "Please provide a base64 encoded image." });
  }

  try {
    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return res.status(400).json({ message: "Invalid base64 string structure." });
    }

    const type = matches[1];
    const imageBuffer = Buffer.from(matches[2], "base64");

    // Determine extension
    let extension = "png";
    if (type.includes("jpeg") || type.includes("jpg")) {
      extension = "jpg";
    } else if (type.includes("webp")) {
      extension = "webp";
    }

    const filename = `saree_${Date.now()}.${extension}`;
    const filepath = path.join(UPLOADS_DIR, filename);

    fs.writeFileSync(filepath, imageBuffer);

    // Return relative url path accessible via /uploads/...
    const imageUrl = `/uploads/${filename}`;
    res.json({ success: true, imageUrl, message: "Image uploaded successfully!" });
  } catch (error) {
    console.error("Image upload processing error:", error);
    res.status(500).json({ message: "Internal server error during image upload save." });
  }
});


// Hook Vite dev server middleware in development mode, otherwise serve bundle static assets
async function start() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`demo-web Admin Server starting on http://0.0.0.0:${PORT}`);
    console.log(`Database sync at: ${DB_FILE}`);
    console.log(`Uploads serving from: ${UPLOADS_DIR}`);
  });
}

start().catch((err) => {
  console.error("Failed to start full-stack server:", err);
});
