import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Package, IndianRupee, Tag, ShieldAlert, FileText, ChevronRight } from "lucide-react";
import { Product } from "../types";
import Input from "./Input";
import Button from "./Button";
import ImageUpload from "./ImageUpload";

interface ProductFormProps {
  initialData?: Partial<Product>;
  onSubmit: (data: Omit<Product, "id" | "createdAt">) => Promise<boolean>;
  isSubmitting: boolean;
  title: string;
}

const CATEGORIES = [
  "Silk Saree",
  "Georgette Saree",
  "Cotton Saree",
  "Linen Saree",
  "Organza Saree",
  "Designer Saree",
  "Kurtis & Suits",
  "Lehenga Choli",
];

const STOCK_STATUSES = ["In Stock", "Low Stock", "Out of Stock"] as const;

export default function ProductForm({
  initialData,
  onSubmit,
  isSubmitting,
  title,
}: ProductFormProps) {
  const navigate = useNavigate();

  // Controlled states
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [price, setPrice] = useState(initialData?.price ? String(initialData.price) : "");
  const [category, setCategory] = useState(initialData?.category || CATEGORIES[0]);
  const [stockStatus, setStockStatus] = useState<Product["stockStatus"]>(
    initialData?.stockStatus || "In Stock"
  );
  const [image, setImage] = useState(initialData?.image || "");

  // Form errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please specify an elegant product name.";
    } else if (name.trim().length < 3) {
      newErrors.name = "Product name must be at least 3 characters.";
    }

    if (!price.trim() || isNaN(Number(price))) {
      newErrors.price = "Please provide an accurate retail price.";
    } else if (Number(price) <= 0) {
      newErrors.price = "The retail price must be greater than zero.";
    }

    if (!image) {
      newErrors.image = "Please upload or supply an image thumbnail.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: Number(price),
      category,
      stockStatus,
      image,
    };

    const success = await onSubmit(payload);
    if (success) {
      navigate("/products");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-sans">
      <div className="bg-white rounded-xl border border-gray-100 p-5 md:p-6 shadow-xs space-y-6">
        <h4 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-50 pb-3 flex items-center gap-2">
          <Package className="w-4 h-4 text-emerald-700" />
          {title}
        </h4>

        {/* Name Input */}
        <Input
          label="Apparel Name"
          placeholder="e.g., Kanchipuram Organza Golden Border Saree"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
          error={errors.name}
          icon={<Package className="w-4.5 h-4.5 text-gray-400" />}
          disabled={isSubmitting}
        />

        {/* Short Description */}
        <Input
          label="Description & Specifications"
          placeholder="Describe the fabric, weave details, zari count, border patterns, washing guidelines..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={4}
          disabled={isSubmitting}
          icon={<FileText className="w-4.5 h-4.5 text-gray-400" />}
        />

        {/* Price & Category split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Retail Price (INR)"
            placeholder="e.g., 4500"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              if (errors.price) setErrors((prev) => ({ ...prev, price: "" }));
            }}
            error={errors.price}
            icon={<IndianRupee className="w-4.5 h-4.5 text-gray-400" />}
            disabled={isSubmitting}
          />

          <div>
            <label className="block text-xs font-semibold text-gray-700 tracking-wide uppercase mb-1.5 flex items-center gap-1.5">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              <span>Category Hierarchy</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-800 shadow-xs focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 disabled:bg-gray-50 disabled:text-gray-400"
              disabled={isSubmitting}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stock status toggle */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 tracking-wide uppercase mb-2 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-gray-400" />
            <span>Inventory Stock Status</span>
          </label>
          <div className="grid grid-cols-3 gap-3">
            {STOCK_STATUSES.map((status) => {
              const borderColors = {
                "In Stock": "peer-checked:border-emerald-500 peer-checked:bg-emerald-50/20 hover:border-emerald-300",
                "Low Stock": "peer-checked:border-amber-500 peer-checked:bg-amber-50/20 hover:border-amber-300",
                "Out of Stock": "peer-checked:border-rose-500 peer-checked:bg-rose-50/20 hover:border-rose-300",
              };

              const textColors = {
                "In Stock": "peer-checked:text-emerald-800",
                "Low Stock": "peer-checked:text-amber-800",
                "Out of Stock": "peer-checked:text-rose-800",
              };

              return (
                <label key={status} className="relative cursor-pointer select-none">
                  <input
                    type="radio"
                    name="stockStatus"
                    value={status}
                    checked={stockStatus === status}
                    onChange={() => setStockStatus(status)}
                    className="hidden peer"
                    disabled={isSubmitting}
                  />
                  <div className={`border rounded-lg text-center p-3 text-xs md:text-sm font-semibold text-gray-600 transition-all duration-200 border-gray-200 ${borderColors[status]} ${textColors[status]}`}>
                    {status}
                  </div>
                </label>
              );
            })}
          </div>
        </div>

        {/* Photo Upload block */}
        <div className="border-t border-gray-50 pt-5">
          <ImageUpload
            currentImageUrl={image}
            onUploadSuccess={(url) => {
              setImage(url);
              if (errors.image) setErrors((prev) => ({ ...prev, image: "" }));
            }}
          />
          {errors.image && (
            <p className="mt-1.5 text-xs text-rose-500 font-semibold flex items-center gap-1">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{errors.image}</span>
            </p>
          )}
        </div>
      </div>

      {/* Buttons Block */}
      <div className="flex justify-end gap-3.5">
        <Button
          type="button"
          variant="secondary"
          onClick={() => navigate("/products")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          Save Saree Details
        </Button>
      </div>
    </form>
  );
}
