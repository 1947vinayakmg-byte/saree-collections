import React, { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ToastNotifications from "./ToastNotifications";
import Loader from "./Loader";

export default function Layout() {
  const { isAuthenticated, token } = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Protected route check
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      {/* Visual Navigation Drawer */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Container */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header Controls bar */}
        <Topbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

        {/* Dynamic Route Children Outlet Scroll viewport */}
        <main className="flex-1 overflow-y-auto px-4 md:px-8 py-6 md:py-8">
          <Outlet />
        </main>
      </div>

      {/* Active Toast Notification banner alert alerts */}
      <ToastNotifications />
    </div>
  );
}
