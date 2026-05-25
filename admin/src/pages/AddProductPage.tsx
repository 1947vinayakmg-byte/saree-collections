import React, { useState } from "react";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../context/AdminContext";
import ProductForm from "../components/ProductForm";
import Button from "../components/Button";

export default function AddProductPage() {
  const { addProduct } = useAdmin();
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (productData: any) => {
    setIsSaving(true);
    const success = await addProduct(productData);
    setIsSaving(false);
    return success;
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto font-sans animate-in fade-in duration-300">
      {/* Breadcrumb Navigation Headers */}
      <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
        <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to catalog</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
          <span>Inventory</span>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-gray-800 font-bold">Add Design</span>
        </div>
      </div>

      {/* Product Register Form Grid */}
      <ProductForm
        title="Register demo-web Item"
        onSubmit={handleCreate}
        isSubmitting={isSaving}
      />
    </div>
  );
}
