/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;
  createdAt: string;
}

export interface ShopSettings {
  shopName: string;
  whatsappNumber: string;
  instagramLink: string;
  facebookLink: string;
  paymentLink: string;
}

export interface User {
  email: string;
  role: string;
}

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
}

export interface DashboardStats {
  totalProducts: number;
  inStockCount: number;
  lowStockCount: number;
  outOfStockCount: number;
  categoriesCount: number;
  recentProducts: Product[];
}
