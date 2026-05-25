import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  colorPreset?: "emerald" | "amber" | "rose" | "indigo" | "gold";
}

export default function DashboardCard({
  title,
  value,
  icon,
  description,
  colorPreset = "emerald",
}: DashboardCardProps) {
  const colorStyles = {
    emerald: {
      bg: "bg-emerald-50",
      iconColor: "text-emerald-700 bg-emerald-100",
      border: "border-l-4 border-l-emerald-600",
    },
    amber: {
      bg: "bg-amber-50",
      iconColor: "text-amber-700 bg-amber-100",
      border: "border-l-4 border-l-amber-500",
    },
    rose: {
      bg: "bg-rose-50",
      iconColor: "text-rose-700 bg-rose-100",
      border: "border-l-4 border-l-rose-500",
    },
    indigo: {
      bg: "bg-indigo-50",
      iconColor: "text-indigo-700 bg-indigo-100",
      border: "border-l-4 border-l-indigo-600",
    },
    gold: {
      bg: "bg-yellow-50",
      iconColor: "text-yellow-700 bg-yellow-100",
      border: "border-l-4 border-l-yellow-600",
    },
  };

  const selectedPreset = colorStyles[colorPreset] || colorStyles.emerald;

  return (
    <div
      className={`bg-white rounded-xl shadow-xs border border-gray-100 ${selectedPreset.border} p-5 flex items-center justify-between hover:shadow-md transition-all duration-200 group`}
    >
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-sans mb-1">
          {title}
        </p>
        <h4 className="text-2xl font-bold text-gray-900 font-sans tracking-tight mb-1 group-hover:text-emerald-800 transition-colors">
          {value}
        </h4>
        {description && (
          <p className="text-xs text-gray-500 font-sans truncate">{description}</p>
        )}
      </div>

      <div className={`p-3 rounded-xl ml-4 flex-shrink-0 ${selectedPreset.iconColor} transition-transform group-hover:scale-105 duration-200`}>
        {icon}
      </div>
    </div>
  );
}
