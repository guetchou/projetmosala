import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  color?: "green" | "blue" | "yellow" | "red" | "purple";
  trend?: "up" | "down" | "neutral";
  loading?: boolean;
  children?: ReactNode;
}

const colorVariants = {
  green: {
    bg: "bg-[var(--color-mosala-green-50)]",
    border: "border-[var(--color-mosala-green-200)]",
    icon: "text-[var(--color-mosala-green-600)]",
    change: "text-[var(--color-mosala-green-600)]",
  },
  citron: {
    bg: "bg-gray-50",
    border: "border-gray-200",
    icon: "text-gray-600",
    change: "text-gray-600",
  },
  yellow: {
    bg: "bg-[var(--color-mosala-yellow-50)]",
    border: "border-[var(--color-mosala-yellow-200)]",
    icon: "text-[var(--color-mosala-yellow-600)]",
    change: "text-[var(--color-mosala-yellow-600)]",
  },
  red: {
    bg: "bg-red-50",
    border: "border-red-200",
    icon: "text-red-600",
    change: "text-red-600",
  },
  purple: {
    bg: "bg-purple-50",
    border: "border-purple-200",
    icon: "text-purple-600",
    change: "text-purple-600",
  },
};

const MetricCard = ({
  title,
  value,
  change,
  changeLabel,
  icon: Icon,
  color = "green",
  trend = "neutral",
  loading = false,
  children,
}: MetricCardProps) => {
  const colors = colorVariants[color];

  return (
    <motion.div
      className={`relative p-6 rounded-2xl border-2 ${colors.bg} ${colors.border} shadow-lg hover:shadow-xl transition-all duration-300 group`}
      whileHover={{ scale: 1.02, y: -2 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-current to-transparent rounded-full -translate-y-16 translate-x-16" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${colors.bg} ${colors.border} border`}>
            <Icon className={`w-6 h-6 ${colors.icon}`} />
          </div>
          {change !== undefined && (
            <div className={`flex items-center gap-1 text-sm font-medium ${colors.change}`}>
              <span className={trend === "up" ? "text-green-600" : trend === "down" ? "text-red-600" : "text-gray-600"}>
                {trend === "up" ? "↗" : trend === "down" ? "↘" : "→"}
              </span>
              <span>{change}%</span>
              {changeLabel && <span className="text-gray-500">vs {changeLabel}</span>}
            </div>
          )}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-sm font-medium text-[var(--color-mosala-dark-400)] mb-2">
            {title}
          </h3>
          
          {loading ? (
            <div className="h-8 bg-gray-200 rounded animate-pulse" />
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-[var(--color-mosala-dark-700)]">
                {value}
              </span>
            </div>
          )}

          {children && (
            <div className="mt-4 pt-4 border-t border-[var(--color-mosala-green-100)]">
              {children}
            </div>
          )}
        </div>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
      </div>
    </motion.div>
  );
};

export default MetricCard; 