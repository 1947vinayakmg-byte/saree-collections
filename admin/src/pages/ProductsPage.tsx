import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, ShoppingBag, ListFilter } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import ProductTable from "../components/ProductTable";
import SearchBar from "../components/SearchBar";
import Button from "../components/Button";

export default function ProductsPage() {
  const { products, isLoadingProducts, fetchProducts } = useAdmin();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    fetchProducts(query);
  };

  // Re-fetch products on mount
  useEffect(() => {
    fetchProducts("");
  }, [fetchProducts]);

  return (
    <div className="space-y-6 font-sans animate-in fade-in duration-300">
      {/* Search and Action Bar */}
      <div className="bg-white rounded-xl border border-gray-100 p-5 md:p-6 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search Input block */}
        <div className="flex-1 max-w-md">
          <SearchBar onSearch={handleSearch} placeholder="Search sarees by name, category or weave..." />
        </div>

        {/* Action Triggers */}
        <div className="flex items-center gap-2.5">
          <Link to="/products/add">
            <Button variant="primary" icon={<PlusCircle className="w-4 h-4" />}>
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Catalog Directory Info Alert Bar */}
      {searchQuery && (
        <div className="flex items-center justify-between p-3.5 bg-slate-50 border border-gray-100 rounded-lg text-xs font-semibold text-gray-500">
          <p className="flex items-center gap-1.5">
            <ListFilter className="w-4 h-4 text-emerald-700" />
            <span>
              Showing results for keyword "<span className="text-slate-800 font-bold">{searchQuery}</span>"
            </span>
          </p>
          <button
            onClick={() => handleSearch("")}
            className="text-emerald-700 hover:text-emerald-800 font-bold cursor-pointer"
          >
            Clear Filter
          </button>
        </div>
      )}

      {/* Main product visualization container */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-1.5">
            <ShoppingBag className="w-4 h-4 text-gray-400" />
            <span>Store Designs Inventory List ({products.length})</span>
          </h4>
        </div>
        
        <ProductTable products={products} isLoading={isLoadingProducts} />
      </div>
    </div>
  );
}
