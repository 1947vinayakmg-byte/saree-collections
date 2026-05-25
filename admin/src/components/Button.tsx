import React, { ButtonHTMLAttributes } from "react";
import Loader from "./Loader";

interface ButtonProps {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "gold";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: (e: any) => void | any;
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyle =
    "inline-flex items-center justify-center gap-2 font-medium font-sans rounded-lg transition-all duration-200 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const variantStyles = {
    primary:
      "bg-emerald-700 hover:bg-emerald-800 text-white shadow-sm border border-emerald-800 focus:ring-emerald-500",
    secondary:
      "bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm focus:ring-gray-300",
    gold:
      "bg-amber-600 hover:bg-amber-700 text-white shadow-sm border border-amber-600 focus:ring-amber-500",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white shadow-sm border border-rose-600 focus:ring-rose-500",
    ghost:
      "bg-transparent hover:bg-gray-100 text-gray-600 focus:ring-gray-200",
  };

  return (
    <button
      disabled={disabled || isLoading}
      className={`${baseStyle} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader size="sm" variant={variant === "secondary" || variant === "ghost" ? "primary" : "white"} />
      ) : (
        icon && <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
    </button>
  );
}
