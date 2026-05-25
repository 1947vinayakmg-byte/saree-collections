import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import Layout from "../components/Layout";
import LoginPage from "../pages/LoginPage";
import Dashboard from "../pages/Dashboard";
import ProductsPage from "../pages/ProductsPage";
import AddProductPage from "../pages/AddProductPage";
import EditProductPage from "../pages/EditProductPage";
import SettingsPage from "../pages/SettingsPage";
import Loader from "../components/Loader";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  const { isAuthenticated, token } = useAdmin();

  // If we have an active token but connection state is booting, we can show a loader
  const isLocalStorageChecking = token && !isAuthenticated;

  if (isLocalStorageChecking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-slate-50">
        <Loader size="lg" message="Verifying Store Security Profile..." />
      </div>
    );
  }

  return (
    <Routes>
      {/* 1. Login Page portal (accessible to unauthenticated guests) */}
      <Route
        path="/login"
        element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" replace />}
      />

      {/* 2. Structured Admin protected layout */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/add" element={<AddProductPage />} />
        <Route path="/products/edit/:id" element={<EditProductPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>

      {/* 3. Wildcard wildcard fallback routing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
