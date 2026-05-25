import React, { useState, DragEvent, useRef } from "react";
import { Upload, Image as ImageIcon, X, AlertCircle } from "lucide-react";
import { useAdmin } from "../context/AdminContext";
import Loader from "./Loader";

interface ImageUploadProps {
  currentImageUrl?: string;
  onUploadSuccess: (url: string) => void;
  label?: string;
}

export default function ImageUpload({
  currentImageUrl,
  onUploadSuccess,
  label = "Product Image",
}: ImageUploadProps) {
  const { uploadImage, showToast } = useAdmin();
  const [dragActive, setDragActive] = useState(false);
  const [imagePreview, setImagePreview] = useState(currentImageUrl || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parse and compress/send files
  const processFile = async (file: File) => {
    // Basic file validation
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      showToast("Only JPG, JPEG, PNG, and WEBP formats are supported.", "error");
      return;
    }

    if (file.size > 8 * 1024 * 1024) { // 8MB limit
      showToast("Please choose an image below 8MB in scale.", "error");
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;
        
        // Call our server context upload function
        const uploadedUrl = await uploadImage(base64Data);
        if (uploadedUrl) {
          setImagePreview(uploadedUrl);
          onUploadSuccess(uploadedUrl);
          showToast("Image processed and uploaded successfully!", "success");
        } else {
          // Fallback to storing local base64 on client if server is slow / has an error
          setImagePreview(base64Data);
          onUploadSuccess(base64Data);
          showToast("Local base64 fallback configuration activated.", "info");
        }
      };
      
      reader.onerror = () => {
        showToast("Error reading chosen image file details.", "error");
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error("Upload error:", err);
      showToast("An unexpected error occurred during image load.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  // Drag listeners
  const handleDrag = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemove = () => {
    setImagePreview("");
    onUploadSuccess("");
  };

  return (
    <div className="w-full">
      <span className="block text-xs font-semibold text-gray-700 tracking-wide uppercase mb-1.5 font-sans">
        {label}
      </span>

      {imagePreview ? (
        <div className="relative group overflow-hidden rounded-xl border border-gray-100 bg-gray-50 aspect-video max-h-56 flex items-center justify-center">
          <img
            src={imagePreview}
            alt="Uploaded preview"
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain"
          />
          {/* Layer Overlay */}
          <div className="absolute inset-0 bg-gray-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={onButtonClick}
              className="px-3.5 py-2 bg-white/95 text-gray-800 text-xs font-semibold rounded-lg hover:bg-white border cursor-pointer border-gray-200 transition-colors shadow-sm font-sans"
            >
              Replace Photo
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="p-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 cursor-pointer transition-colors shadow-sm"
              title="Remove image"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={onButtonClick}
          className={`relative border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center cursor-pointer min-h-48 text-center transition-colors group ${
            dragActive
              ? "border-emerald-600 bg-emerald-50/20"
              : "border-gray-200 bg-gray-50 hover:bg-gray-100/50 hover:border-emerald-500"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChange}
          />

          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader size="md" message="Processing Saree Photo..." />
            </div>
          ) : (
            <div className="space-y-2">
              <div className="mx-auto w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center transition-transform group-hover:scale-110 duration-200">
                <Upload className="w-6 h-6" />
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-sm font-medium text-gray-700 font-sans">
                  Drag and drop your image, or <span className="text-emerald-700 hover:underline">browse</span>
                </p>
                <p className="text-xs text-gray-400 font-sans">
                  Supports JPG, PNG, WEBP (Max 8MB)
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
