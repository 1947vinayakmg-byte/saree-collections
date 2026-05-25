import axios from "axios";

// Create an Axios instance with base URL
const API = axios.create({
  baseURL: "http://localhost:5000/api",
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
