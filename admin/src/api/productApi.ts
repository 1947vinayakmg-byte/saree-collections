import axios from "axios";

// Create an Axios instance with base URL
const hostname = window.location.hostname;
const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.");
const API_BASE = isLocal
  ? "http://localhost:5000/api"
  : "https://saree-collections-jqa7.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE,
});

// Interceptor: Automatically attach the token to every request.
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token") || localStorage.getItem("admin_token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// GET PRODUCTS
export const getProducts = async () => {
  try {
    const response = await API.get("/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// ADD PRODUCT
export const addProduct = async (formData: FormData, token: string) => {
  try {
    const response = await API.post("/products/add", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// DELETE PRODUCT
export const deleteProduct = async (id: string | number, token: string) => {
  try {
    const response = await API.delete(`/products/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};
