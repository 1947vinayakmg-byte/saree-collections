import React from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { useAdmin } from "../context/AdminContext";

export default function ToastNotifications() {
  const { toasts, removeToast } = useAdmin();

  if (toasts.length === 0) return null;

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    warning: <AlertCircle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgStyles = {
    success: "bg-white border-l-4 border-l-emerald-500 text-gray-800 shadow-lg",
    error: "bg-white border-l-4 border-l-rose-500 text-gray-800 shadow-lg",
    warning: "bg-white border-l-4 border-l-amber-500 text-gray-800 shadow-lg",
    info: "bg-white border-l-4 border-l-blue-500 text-gray-800 shadow-lg",
  };

  return (
    <div className="fixed top-5 right-5 z-[100] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto flex items-start gap-3 rounded-lg border border-gray-100 p-4 transition-all duration-300 transform translate-y-0 scale-100 animate-in slide-in-from-right-5 ${
            bgStyles[toast.type]
          }`}
          role="alert"
        >
          <div className="flex-shrink-0 mt-0.5">{icons[toast.type]}</div>
          <div className="flex-1 text-sm font-medium font-sans text-gray-700">
            {toast.message}
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="flex-shrink-0 cursor-pointer rounded-lg p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
