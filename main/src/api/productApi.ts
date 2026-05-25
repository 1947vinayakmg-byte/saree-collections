import axios from "axios";

// Create an Axios instance with base URL
const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://saree-collections-jqa7.onrender.com/api";

const API = axios.create({
  baseURL: API_BASE,
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
