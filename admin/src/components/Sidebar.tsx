import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  Settings,
  LogOut,
  Store,
  X,
  Sparkles,
  MessageSquare
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { settings, logout } = useAdmin();
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Products List",
      path: "/products",
      icon: <ShoppingBag className="w-5 h-5" />,
    },
    {
      label: "Add Product",
      path: "/products/add",
      icon: <PlusCircle className="w-5 h-5" />,
    },
    {
      label: "Shop Settings",
      path: "/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  const shopName = settings?.shopName || "demo saree";

  const sidebarContent = (
    <div className="flex flex-col h-full bg-slate-900 text-white font-sans">
      {/* Brand Logo/Header */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
        <Link to="/" onClick={onClose} className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-900 font-bold shadow-md shadow-amber-500/10 group-hover:rotate-12 transition-transform duration-200">
            <Store className="w-5 h-5 text-slate-950" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold tracking-wide group-hover:text-amber-400 transition-colors uppercase truncate">
              {shopName}
            </h1>
            <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5 text-amber-500 animate-pulse" />
              Saree Admin
            </p>
          </div>
        </Link>
        <button
          onClick={onClose}
          className="lg:hidden p-1 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive =
            item.path === "/"
              ? location.pathname === "/"
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={onClose}
              className={`flex items-center gap-3.5 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 group cursor-pointer ${isActive
                  ? "bg-emerald-700 text-white shadow-md shadow-emerald-800/20"
                  : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
            >
              <span className={`transition-colors ${isActive ? "text-amber-400" : "text-gray-400 group-hover:text-gray-200"}`}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Footer / Logout */}
      <div className="p-4 border-t border-white/10 space-y-3">
        {settings?.whatsappNumber && (
          <a
            href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-800/40 hover:bg-emerald-800/60 border border-emerald-500/20 rounded-lg p-3 text-xs text-emerald-300 transition-colors font-sans font-medium"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <div className="min-w-0">
              <p className="font-bold">Customer Chat</p>
              <p className="text-[10px] opacity-80 text-gray-300 truncate">{settings.whatsappNumber}</p>
            </div>
          </a>
        )}

        <button
          onClick={() => {
            onClose();
            logout();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold text-rose-300 hover:text-white hover:bg-rose-950/20 border border-transparent hover:border-rose-950 transition-all duration-200 cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-400 flex-shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (visible on large screen) */}
      <aside className="hidden lg:block w-64 h-screen sticky top-0 flex-shrink-0 z-20">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none"
          }`}
      >
        {/* Backdrop overlay */}
        <div
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
            }`}
          onClick={onClose}
        />

        {/* Actual Sidebar Content */}
        <div className="absolute left-0 w-64 h-full shadow-2xl">
          {sidebarContent}
        </div>
      </div>
    </>
  );
}
