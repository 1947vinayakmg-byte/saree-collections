import React from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  ShieldCheck,
  AlertTriangle,
  Layers,
  Sparkles,
  PlusCircle,
  Settings,
  ArrowRight,
  TrendingUp,
  ExternalLink,
  MessageSquare
} from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import DashboardCard from "../components/DashboardCard";
import Button from "../components/Button";
import Loader from "../components/Loader";

export default function Dashboard() {
  const { dashboardStats, isLoadingStats, settings } = useAdmin();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStockColor = (status: string) => {
    if (status === "In Stock") return "text-emerald-500 bg-emerald-50 border-emerald-100";
    if (status === "Low Stock") return "text-amber-500 bg-amber-50 border-amber-100";
    return "text-rose-500 bg-rose-50 border-rose-100";
  };

  const shopName = settings?.shopName || "demo saree";

  if (isLoadingStats) {
    return <Loader size="lg" message="Loading demo-web Overview Dashboard..." />;
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-300 font-sans">
      {/* 1. Header welcome banner */}
      <div className="relative bg-slate-900 rounded-2xl p-6 md:p-8 text-white overflow-hidden shadow-md">
        <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_top_right,var(--color-amber-500),transparent_50%)]" />
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-emerald-700/10 rounded-full blur-3xl" />

        <div className="relative z-10 space-y-3 max-w-xl">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-bold text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Summer Sale Active</span>
          </span>
          <h3 className="text-xl md:text-3xl font-black tracking-tight leading-snug">
            Welcome Back, Owner!
          </h3>
          <p className="text-xs md:text-sm text-gray-300 leading-relaxed font-normal">
            Your demo-web <span className="text-amber-400 font-extrabold">{shopName}</span> database is synchronized. Review real-time counts, configure low inventory warnings, and manage catalog details below.
          </p>
        </div>
      </div>

      {/* 2. Simple Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <DashboardCard
          title="Total Styles"
          value={dashboardStats.totalProducts}
          icon={<ShoppingBag className="w-6 h-6" />}
          description="Total designs in database"
          colorPreset="indigo"
        />
        <DashboardCard
          title="Optimal (In Stock)"
          value={dashboardStats.inStockCount}
          icon={<ShieldCheck className="w-6 h-6" />}
          description="Ready for dispatch"
          colorPreset="emerald"
        />
        <DashboardCard
          title="Attention (Low)"
          value={dashboardStats.lowStockCount}
          icon={<AlertTriangle className="w-6 h-6" />}
          description="Requires reorder soon"
          colorPreset="amber"
        />
        <DashboardCard
          title="Categories"
          value={dashboardStats.categoriesCount}
          icon={<Layers className="w-6 h-6" />}
          description="Unique product rows"
          colorPreset="gold"
        />
      </div>

      {/* 3. Quick Action Buttons Grid */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 md:p-6 shadow-xs space-y-4">
        <h4 className="text-xs font-bold text-gray-900 uppercase tracking-widest flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-700" />
          <span>Quick Administrative Commands</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Add Product shortcut */}
          <Link
            to="/products/add"
            className="group hover:border-emerald-200 hover:bg-emerald-50/10 p-4 border border-gray-100 rounded-xl flex items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-700 rounded-lg group-hover:scale-110 transition-transform">
                <PlusCircle className="w-5 h-5" />
              </div>
              <div className="text-left font-sans">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Draft New Piece
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
                  Add designs & photos
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Settings shortcut */}
          <Link
            to="/settings"
            className="group hover:border-amber-200 hover:bg-amber-50/10 p-4 border border-gray-100 rounded-xl flex items-center justify-between gap-4 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg group-hover:scale-110 transition-transform">
                <Settings className="w-5 h-5" />
              </div>
              <div className="text-left font-sans">
                <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  Configure Shop
                </p>
                <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
                  Store info & social links
                </p>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
          </Link>

          {/* Whatsapp Support Test */}
          {settings?.whatsappNumber ? (
            <a
              href={`https://wa.me/${settings.whatsappNumber.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group hover:border-blue-200 hover:bg-blue-50/10 p-4 border border-gray-100 rounded-xl flex items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-left font-sans">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    WhatsApp Desk
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
                    Instant custom click verify
                  </p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-gray-400" />
            </a>
          ) : (
            <Link
              to="/settings"
              className="group hover:border-orange-200 hover:bg-orange-50/10 p-4 border border-gray-100 rounded-xl flex items-center justify-between gap-4 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-orange-50 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div className="text-left font-sans">
                  <p className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Setup Supports
                  </p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-snug">
                    Enter social media links
                  </p>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </div>

      {/* 4. Recently Added Products Table representation */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-xs p-5 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-gray-50 pb-3">
          <div>
            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest leading-none">
              Recently Added Styles
            </h4>
            <p className="text-[11px] text-gray-400 mt-1.5 font-medium font-sans">
              Latest textile additions published across your shop display portals.
            </p>
          </div>
          <Link to="/products">
            <Button size="sm" variant="ghost" className="text-xs text-emerald-700 hover:text-emerald-800 font-sans font-semibold">
              <span>View Full Directory</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        {dashboardStats.recentProducts.length === 0 ? (
          <div className="text-center py-10 font-sans text-gray-400">
            <p className="text-xs font-bold uppercase tracking-wider">No products catalogued</p>
            <p className="text-[10px] text-gray-400 mt-1">
              Add your very first saree using the shortcuts panel above!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dashboardStats.recentProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-4 p-3 rounded-xl border border-gray-50 bg-slate-50/30 font-sans hover:shadow-xs hover:bg-white transition-all group"
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 flex items-center justify-center">
                  <img
                    src={p.image}
                    alt={p.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h5 className="text-xs font-bold text-gray-900 truncate tracking-tight">
                    {p.name}
                  </h5>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{p.category}</span>
                    <span className="text-gray-300">&#8226;</span>
                    <span className="text-xs font-bold text-emerald-700">{formatPrice(p.price)}</span>
                  </div>
                  {/* Stock status badge */}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold mt-2 ${getStockColor(p.stockStatus)}`}>
                    {p.stockStatus}
                  </span>
                </div>
                <Link to={`/products/edit/${p.id}`} className="flex-shrink-0 p-1 rounded-md text-gray-400 hover:text-slate-800 hover:bg-slate-50">
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
