import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
}

export default function Input({
  label,
  error,
  helperText,
  icon,
  multiline = false,
  rows = 3,
  className = "",
  id,
  ...props
}: InputFieldProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const labelClass = "block text-xs font-semibold text-gray-700 tracking-wide uppercase mb-1.5 font-sans";
  const helperClass = "mt-1 text-xs text-gray-400 font-sans";
  const errorClass = "mt-1 text-xs text-rose-500 font-semibold font-sans";
  
  const baseInputStyle =
    "w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm text-gray-900 shadow-xs transition-colors placeholder-gray-400 focus:border-emerald-600 focus:outline-none focus:ring-1 focus:ring-emerald-600 disabled:bg-gray-50 disabled:text-gray-400";
  
  const errorInputStyle =
    "border-rose-300 focus:border-rose-500 focus:ring-rose-500 bg-rose-50/10";

  const paddingStyle = icon ? "pl-10" : "";

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={inputId} className={labelClass}>
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        {multiline ? (
          <textarea
            id={inputId}
            rows={rows}
            className={`${baseInputStyle} ${error ? errorInputStyle : ""} ${className}`}
            {...(props as unknown as TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            id={inputId}
            className={`${baseInputStyle} ${paddingStyle} ${error ? errorInputStyle : ""}`}
            {...props}
          />
        )}
      </div>

      {error ? (
        <p className={errorClass}>{error}</p>
      ) : (
        helperText && <p className={helperClass}>{helperText}</p>
      )}
    </div>
  );
}
