import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "white";
  fullScreen?: boolean;
  message?: string;
}

export default function Loader({
  size = "md",
  variant = "primary",
  fullScreen = false,
  message,
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-5 h-5 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const colorClasses = {
    primary: "border-gray-200 border-t-emerald-600",
    secondary: "border-gray-200 border-t-amber-500",
    white: "border-white/30 border-t-white",
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`animate-spin rounded-full ${sizeClasses[size]} ${colorClasses[variant]}`}
        role="status"
        aria-label="loading"
      />
      {message && <p className="text-sm font-medium text-gray-500 font-sans">{message}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/60 backdrop-blur-sm">
        <div className="rounded-xl bg-white p-6 shadow-xl max-w-sm text-center">
          {spinner}
        </div>
      </div>
    );
  }

  return <div className="flex items-center justify-center py-6 w-full">{spinner}</div>;
}
