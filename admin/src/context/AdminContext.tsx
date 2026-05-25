import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { Product, ShopSettings, User, Toast, DashboardStats } from "../types";

interface AdminContextProps {
  // Auth state
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  isLoggingIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkSession: () => Promise<void>;

  // Products state
  products: Product[];
  isLoadingProducts: boolean;
  fetchProducts: (search?: string) => Promise<void>;
  addProduct: (product: Omit<Product, "id" | "createdAt">) => Promise<boolean>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<boolean>;
  deleteProduct: (id: string) => Promise<boolean>;

  // Settings state
  settings: ShopSettings | null;
  isLoadingSettings: boolean;
  fetchSettings: () => Promise<void>;
  updateSettings: (newSettings: ShopSettings) => Promise<boolean>;

  // Upload utility
  uploadImage: (base64Image: string) => Promise<string | null>;

  // General loader/dashboard
  dashboardStats: DashboardStats;
  isLoadingStats: boolean;

  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
}

const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://saree-collections-jqa7.onrender.com/api";

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}

export function AdminProvider({ children }: { children: ReactNode }) {
  // Toasts state
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: Toast["type"] = "success") => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 3.5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Auth State
  const [token, setToken] = useState<string | null>(localStorage.getItem("admin_token"));
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);

  // Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState<boolean>(false);

  const [settings, setSettings] = useState<ShopSettings | null>(null);
  const [isLoadingSettings, setLoadingSettings] = useState<boolean>(false);

  // Check Session on mount
  const checkSession = useCallback(async () => {
    const storedToken = localStorage.getItem("admin_token");
    if (!storedToken) {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: {
          "Authorization": `Bearer ${storedToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setIsAuthenticated(true);
        setToken(storedToken);
        setUser(data.user);
      } else {
        // Clear expired token
        localStorage.removeItem("admin_token");
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
      }
    } catch (e) {
      // Offline fallback: if server is booting or offline, trust standard stored token
      console.warn("Unable to connect to authenticate session, relying on existing local token details.");
      setIsAuthenticated(true);
      setToken(storedToken);
      setUser({ email: "admin@shop.com", role: "admin" });
    }
  }, []);

  // Log in
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoggingIn(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
        setUser(data.user);
        setIsAuthenticated(true);
        showToast("Welcome back! Login successful.", "success");
        return true;
      } else {
        showToast(data.message || "Invalid credentials. Please try again.", "error");
        return false;
      }
    } catch (e) {
      showToast("Server connection failed. Check your internet connection.", "error");
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Log out
  const logout = useCallback(() => {
    localStorage.removeItem("admin_token");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    showToast("Signed out successfully.", "info");
  }, [showToast]);

  // Fetch products
  const fetchProducts = useCallback(async (search = "") => {
    setIsLoadingProducts(true);
    try {
      const queryParam = search ? `?search=${encodeURIComponent(search)}` : "";
      const res = await fetch(`${API_URL}/products${queryParam}`);
      if (res.ok) {
        const data = await res.json();
        // Normalize: backend stores images[] array, UI expects single image string
        const normalized = data.map((p: any) => ({
          ...p,
          id: p._id || p.id,
          image: p.image || (p.images && p.images[0]) || "",
          createdAt: p.createdAt || new Date().toISOString(),
        }));
        setProducts(normalized);
      } else {
        showToast("Failed to retrieve products list.", "error");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setIsLoadingProducts(false);
    }
  }, [showToast]);

  // Add Product
  const addProduct = async (productData: Omit<Product, "id" | "createdAt">): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Product added successfully!", "success");
        // Re-fetch products to update list and stats
        await fetchProducts();
        return true;
      } else {
        showToast(data.message || "Unable to save product.", "error");
        return false;
      }
    } catch (err) {
      showToast("Connection issue during product creation.", "error");
      return false;
    }
  };

  // Update Product
  const updateProduct = async (id: string, productData: Partial<Product>): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(productData)
      });
      const data = await res.json();
      if (res.ok) {
        showToast(data.message || "Product updated successfully!", "success");
        await fetchProducts();
        return true;
      } else {
        showToast(data.message || "Unable to modify product details.", "error");
        return false;
      }
    } catch (err) {
      showToast("Connection issue during product update.", "error");
      return false;
    }
  };

  // Delete Product
  const deleteProduct = async (id: string): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        showToast("Product deleted successfully.", "success");
        await fetchProducts();
        return true;
      } else {
        showToast(data.message || "Unable to delete product.", "error");
        return false;
      }
    } catch (err) {
      showToast("Connection issue during deletion.", "error");
      return false;
    }
  };

  // Fetch settings
  const fetchSettings = useCallback(async () => {
    setLoadingSettings(true);
    try {
      const res = await fetch(`${API_URL}/settings`);
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
      }
    } catch (err) {
      console.error("Error fetching settings:", err);
    } finally {
      setLoadingSettings(false);
    }
  }, []);

  // Update Settings
  const updateSettings = async (newSettings: ShopSettings): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`${API_URL}/settings`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newSettings)
      });
      const data = await res.json();
      if (res.ok) {
        setSettings(data.settings);
        showToast("Shop settings saved successfully!", "success");
        return true;
      } else {
        showToast(data.message || "Failed to update shop configuration.", "error");
        return false;
      }
    } catch (err) {
      showToast("Connection error while updating settings.", "error");
      return false;
    }
  };

  // Upload visual image to uploads
  const uploadImage = async (base64Image: string): Promise<string | null> => {
    if (!token) return null;
    try {
      const res = await fetch(`${API_URL}/upload`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ image: base64Image })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        return data.imageUrl;
      } else {
        showToast(data.message || "Image upload failed.", "error");
        return null;
      }
    } catch (err) {
      showToast("Network failed, fallback to default photo.", "warning");
      return null;
    }
  };

  // Synchronize auth state, products, settings on boot
  useEffect(() => {
    const initialize = async () => {
      await checkSession();
      await fetchProducts();
      await fetchSettings();
    };
    initialize();
  }, [checkSession, fetchProducts, fetchSettings]);

  // Calculate stats on products change
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalProducts: 0,
    inStockCount: 0,
    lowStockCount: 0,
    outOfStockCount: 0,
    categoriesCount: 0,
    recentProducts: [],
  });
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  useEffect(() => {
    setIsLoadingStats(true);
    const totalProducts = products.length;
    const inStockCount = products.filter((p) => p.stockStatus === "In Stock").length;
    const lowStockCount = products.filter((p) => p.stockStatus === "Low Stock").length;
    const outOfStockCount = products.filter((p) => p.stockStatus === "Out of Stock").length;
    
    // Unique categories
    const categories = new Set(products.map((p) => p.category));
    const categoriesCount = categories.size;

    // Last 4 items
    const recentProducts = [...products]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 4);

    setDashboardStats({
      totalProducts,
      inStockCount,
      lowStockCount,
      outOfStockCount,
      categoriesCount,
      recentProducts,
    });
    setIsLoadingStats(false);
  }, [products]);

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        token,
        user,
        isLoggingIn,
        login,
        logout,
        checkSession,
        
        products,
        isLoadingProducts,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,

        settings,
        isLoadingSettings,
        fetchSettings,
        updateSettings,

        uploadImage,
        dashboardStats,
        isLoadingStats,

        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}
