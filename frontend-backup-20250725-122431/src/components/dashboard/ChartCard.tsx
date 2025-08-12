import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  children: ReactNode;
  className?: string;
  loading?: boolean;
}

const ChartCard = ({
  title,
  subtitle,
  icon: Icon,
  children,
  className = "",
  loading = false,
}: ChartCardProps) => {
  return (
    <motion.div
      className={`bg-[var(--color-mosala-white)] rounded-2xl border-2 border-[var(--color-mosala-green-200)] shadow-lg p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 rounded-lg bg-[var(--color-mosala-green-50)] border border-[var(--color-mosala-green-200)]">
              <Icon className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-[var(--color-mosala-dark-700)]">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-[var(--color-mosala-dark-400)]">
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      ) : (
        <div className="relative">
          {children}
        </div>
      )}
    </motion.div>
  );
};

export default ChartCard; 