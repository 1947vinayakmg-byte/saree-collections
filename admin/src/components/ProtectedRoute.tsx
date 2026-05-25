import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Check for either 'token' or 'admin_token' depending on where it was saved
  const token = localStorage.getItem("token") || localStorage.getItem("admin_token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
