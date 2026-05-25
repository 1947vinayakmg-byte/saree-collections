import React, { useEffect, useState, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import ProductForm from "../components/ProductForm";
import Loader from "../components/Loader";
import { Product } from "../types";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const { updateProduct } = useAdmin();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  // Load product from database files
  const fetchProductDetail = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        const data = await res.json();
        setProduct(data);
      } else {
        navigate("/products");
      }
    } catch (err) {
      console.error("Unable to load product profile:", err);
      navigate("/products");
    } finally {
      setIsLoading(false);
    }
  }, [id, navigate]);

  useEffect(() => {
    fetchProductDetail();
  }, [fetchProductDetail]);

  const handleUpdate = async (updatedFields: any) => {
    if (!id) return false;
    setIsSaving(true);
    const success = await updateProduct(id, updatedFields);
    setIsSaving(false);
    return success;
  };

  if (isLoading) {
    return (
      <div className="py-20 flex justify-center">
        <Loader size="lg" message="Retrieving Apparel Details..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20 font-sans">
        <p className="text-sm font-bold text-gray-500">Design metadata could not be found.</p>
        <Link to="/products" className="text-emerald-700 text-xs font-bold hover:underline mt-2 inline-block">
          Return to directory
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto font-sans animate-in fade-in duration-300">
      {/* Breadcrumbs Navigation Headers */}
      <div className="flex flex-col gap-2 border-b border-gray-100 pb-4">
        <Link to="/products" className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-400 hover:text-slate-800 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to catalog</span>
        </Link>
        <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">
          <span>Inventory</span>
          <ChevronRight className="w-3 h-3 text-gray-300" />
          <span className="text-gray-800 font-bold">Edit Piece details</span>
        </div>
      </div>

      {/* Main product updating form container */}
      <ProductForm
        title={`Revise Details: ${product.name}`}
        initialData={product}
        onSubmit={handleUpdate}
        isSubmitting={isSaving}
      />
    </div>
  );
}
