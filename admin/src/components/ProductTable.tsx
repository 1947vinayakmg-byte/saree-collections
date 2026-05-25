import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Edit, Trash2, ShieldAlert, ShoppingBag } from "lucide-react";
import { Product } from "../types";
import { useAdmin } from "../context/AdminContext";
import Button from "./Button";
import Modal from "./Modal";

interface ProductTableProps {
  products: Product[];
  isLoading: boolean;
}

export default function ProductTable({ products, isLoading }: ProductTableProps) {
  const { deleteProduct } = useAdmin();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Parse Indian Rupee formatting
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Determine badging for stock
  const getStockBadge = (status: Product["stockStatus"]) => {
    const styles = {
      "In Stock": "bg-emerald-50 text-emerald-700 border-emerald-200",
      "Low Stock": "bg-amber-50 text-amber-700 border-amber-200",
      "Out of Stock": "bg-rose-50 text-rose-700 border-rose-200",
    };
    return (
      <span
        className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full border ${styles[status]}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
          status === "In Stock" ? "bg-emerald-500" : status === "Low Stock" ? "bg-amber-500" : "bg-rose-500"
        }`} />
        {status}
      </span>
    );
  };

  // Delete flow trigger
  const handleDeleteClick = (id: string) => {
    setSelectedProductId(id);
  };

  const confirmDelete = async () => {
    if (!selectedProductId) return;
    setIsDeleting(true);
    const success = await deleteProduct(selectedProductId);
    setIsDeleting(false);
    if (success) {
      setSelectedProductId(null);
    }
  };

  const targetDeletedProduct = products.find((p) => p.id === selectedProductId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-100 shadow-xs">
        <div className="animate-spin rounded-full w-10 h-10 border-3 border-gray-100 border-t-emerald-600" />
        <p className="text-sm font-semibold text-gray-400 mt-4 font-sans uppercase tracking-widest">
          Syncing Inventory Base...
        </p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-xl border border-gray-100 shadow-xs px-6 font-sans">
        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-gray-400 mx-auto mb-4">
          <ShoppingBag className="w-8 h-8 text-gray-300" />
        </div>
        <h4 className="text-sm font-bold text-gray-800 uppercase tracking-widest">
          No matches found
        </h4>
        <p className="text-xs text-gray-400 mt-1.5 max-w-sm mx-auto">
          We couldn't locate any products matching your active keyword. Try modifying your search or add a new piece.
        </p>
        <div className="mt-5">
          <Link to="/products/add">
            <Button size="sm" variant="gold">
              Add Creative Product
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 1. Desktop Layout (Hiding of small screens) */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl border border-gray-100 shadow-xs">
        <table className="w-full text-left border-collapse font-sans">
          <thead>
            <tr className="bg-slate-50 border-b border-gray-100">
              <th className="px-6 py-4.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Product Base Details
              </th>
              <th className="px-6 py-4.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Category
              </th>
              <th className="px-6 py-4.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Price
              </th>
              <th className="px-6 py-4.5 text-xs font-bold text-gray-400 uppercase tracking-widest">
                Inventory Status
              </th>
              <th className="px-6 py-4.5 text-xs font-bold text-gray-400 uppercase tracking-widest text-right">
                Modify Commands
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                {/* Thumbnail & Name */}
                <td className="px-6 py-4 flex items-center gap-4.5">
                  <div className="w-14 h-14 rounded-lg overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={p.image}
                      alt={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 max-w-xs xl:max-w-md">
                    <p className="text-sm font-bold text-slate-900 truncate group-hover:text-emerald-700">
                      {p.name}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 font-medium line-clamp-1">
                      {p.description || "No customized product descriptions declared."}
                    </p>
                  </div>
                </td>

                {/* Category */}
                <td className="px-6 py-4">
                  <span className="text-xs font-semibold text-slate-700 bg-slate-100 px-3 py-1 rounded-md border border-slate-200">
                    {p.category}
                  </span>
                </td>

                {/* Price */}
                <td className="px-6 py-4">
                  <span className="text-sm font-bold text-slate-900">
                    {formatPrice(p.price)}
                  </span>
                </td>

                {/* Stock Badging */}
                <td className="px-6 py-4">{getStockBadge(p.stockStatus)}</td>

                {/* Edit & Delete Action Buttons */}
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2.5">
                    <Link to={`/products/edit/${p.id}`}>
                      <button
                        className="p-1.5 rounded-lg border border-gray-100 text-gray-500 hover:text-emerald-700 hover:bg-emerald-50 hover:border-emerald-100 transition-all cursor-pointer shadow-xs"
                        title="Edit product"
                      >
                        <Edit className="w-4.5 h-4.5" />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteClick(p.id)}
                      className="p-1.5 rounded-lg border border-gray-100 text-gray-500 hover:text-rose-600 hover:bg-rose-50 hover:border-rose-100 transition-all cursor-pointer shadow-xs"
                      title="Delete product"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 2. Responsive Mobile Card Grid Layout */}
      <div className="block md:hidden space-y-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border border-gray-100 p-4 shadow-xs flex flex-col gap-4 font-sans hover:shadow-sm"
          >
            <div className="flex gap-4.5">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex-shrink-0 flex items-center justify-center">
                <img
                  src={p.image}
                  alt={p.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h5 className="text-sm font-bold text-gray-900 leading-snug truncate">
                  {p.name}
                </h5>
                <p className="text-xs text-slate-600 bg-slate-50 border px-2 py-0.5 rounded-md inline-block mt-1 font-semibold">
                  {p.category}
                </p>
                <div className="flex items-center justify-between mt-2.5">
                  <span className="text-sm font-bold text-gray-900">
                    {formatPrice(p.price)}
                  </span>
                  {getStockBadge(p.stockStatus)}
                </div>
              </div>
            </div>

            {/* Quick action triggers for Mobile */}
            <div className="flex items-center gap-2.5 border-t border-gray-50 pt-3">
              <Link to={`/products/edit/${p.id}`} className="flex-1">
                <button className="w-full flex items-center justify-center gap-2 py-2 border border-gray-100 hover:border-emerald-200 text-xs font-semibold rounded-lg text-emerald-700 bg-emerald-50/40 hover:bg-emerald-50 transition-colors cursor-pointer">
                  <Edit className="w-4 h-4" />
                  <span>Configure</span>
                </button>
              </Link>
              <button
                onClick={() => handleDeleteClick(p.id)}
                className="flex-shrink-0 p-2 border border-gray-100 hover:border-rose-200 text-rose-500 hover:bg-rose-50 rounded-lg cursor-pointer transition-colors"
                title="Delete product"
              >
                <Trash2 className="w-4.5 h-4.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Safe Confirmation Delete Modal component */}
      <Modal
        isOpen={selectedProductId !== null}
        onClose={() => setSelectedProductId(null)}
        title="Delete Inventory Product"
        footer={
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setSelectedProductId(null)}
              disabled={isDeleting}
            >
              Close
            </Button>
            <Button
              variant="danger"
              size="sm"
              isLoading={isDeleting}
              onClick={confirmDelete}
            >
              Confirm Delete
            </Button>
          </div>
        }
      >
        <div className="flex items-start gap-4">
          <div className="p-2.5 bg-rose-50 text-rose-600 rounded-xl flex-shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800 font-sans">
              Are you absolutely certain you want to remove this piece?
            </p>
            {targetDeletedProduct && (
              <div className="mt-2.5 p-3 rounded-lg bg-gray-50 border border-gray-100 flex items-center gap-3">
                <img
                  src={targetDeletedProduct.image}
                  alt={targetDeletedProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 object-cover rounded-md border"
                />
                <span className="text-xs font-bold font-sans text-gray-800 line-clamp-1">
                  {targetDeletedProduct.name}
                </span>
              </div>
            )}
            <p className="text-xs text-gray-400 mt-3 font-sans leading-relaxed">
              This will permanently delete this apparel design from your inventory database files. Customers won't see this saree on your website anymore.
            </p>
          </div>
        </div>
      </Modal>
    </>
  );
}
