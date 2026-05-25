import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Menu, ChevronDown, User, LogOut, ArrowUpRight, MessageSquare } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

interface TopbarProps {
  onMenuToggle: () => void;
}

export default function Topbar({ onMenuToggle }: TopbarProps) {
  const { user, settings, logout } = useAdmin();
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Determine page title based on active path
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/") return "Overview Dashboard";
    if (path === "/products") return "Inventory Directory";
    if (path === "/products/add") return "Add New Product";
    if (path.startsWith("/products/edit")) return "Edit Product Details";
    if (path === "/settings") return "Shop Configurations";
    return "Admin Panel";
  };

  const whatsappLink = settings?.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`
    : null;

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white border-b border-gray-100 px-4 md:px-6 py-3.5 shadow-xs font-sans">
      {/* Title & Hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-lg text-gray-500 hover:text-gray-800 hover:bg-gray-50 focus:outline-none cursor-pointer"
        >
          <Menu className="w-5.5 h-5.5" />
        </button>
        <div className="min-w-0">
          <h2 className="text-base md:text-lg font-bold text-gray-900 tracking-tight truncate">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Quick Links and Admin Dropdown */}
      <div className="flex items-center gap-4">
        {/* Quick Launch Link */}
        {settings?.whatsappNumber && (
          <a
            href={whatsappLink || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-100 hover:bg-emerald-100 hover:border-emerald-200 transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Chat Help Support</span>
          </a>
        )}

        {/* User Account Menu */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 focus:outline-none cursor-pointer p-1 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-800 text-emerald-100 font-bold text-sm flex items-center justify-center shadow-inner">
              {user?.email ? user.email.charAt(0).toUpperCase() : "A"}
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold leading-none truncate max-w-28 text-slate-800">
                {user?.email || "Admin User"}
              </p>
              <p className="text-[10px] text-gray-400 font-semibold leading-none mt-1">
                Store Owner
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* User Options Card */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2.5 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100">
                <p className="text-xs text-gray-400 font-semibold font-sans uppercase tracking-widest leading-none mb-1">
                  Active Profile
                </p>
                <p className="text-sm font-bold text-gray-800 truncate">
                  {user?.email || "admin@shop.com"}
                </p>
              </div>

              <div className="p-1.5 space-y-0.5">
                <Link
                  to="/settings"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-sans"
                >
                  <User className="w-4 h-4 text-gray-400" />
                  <span>Configure demo-web</span>
                </Link>

                <button
                  onClick={() => {
                    setDropdownOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-rose-600 rounded-lg hover:bg-rose-50 hover:text-rose-700 transition-colors font-sans font-medium text-left cursor-pointer"
                >
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
