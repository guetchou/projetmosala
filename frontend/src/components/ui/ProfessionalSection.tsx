import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProfessionalSectionProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  background?: 'none' | 'light' | 'gradient' | 'pattern';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  container?: boolean;
  centered?: boolean;
  animation?: 'fade' | 'slide' | 'scale' | 'none';
}

const ProfessionalSection: React.FC<ProfessionalSectionProps> = ({
  title,
  subtitle,
  children,
  className,
  background = 'none',
  padding = 'lg',
  container = true,
  centered = false,
  animation = 'fade'
}) => {
  const backgroundClasses = {
    none: "",
    light: "bg-gray-50/50",
    gradient: "bg-gradient-to-br from-gray-50/30 via-white/20 to-gray-50/30",
    pattern: "bg-gray-50/50 bg-[url('data:image/svg+xml,%3Csvg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"none\" fill-rule=\"evenodd\"%3E%3Cg fill=\"%239C92AC\" fill-opacity=\"0.05\"%3E%3Ccircle cx=\"30\" cy=\"30\" r=\"2\"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"
  };

  const paddingClasses = {
    sm: "py-8",
    md: "py-12",
    lg: "py-20",
    xl: "py-32"
  };

  const animationVariants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 }
    },
    slide: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    none: {
      initial: {},
      animate: {},
      transition: {}
    }
  };

  const classes = cn(
    "w-full",
    backgroundClasses[background],
    paddingClasses[padding],
    className
  );

  const contentClasses = cn(
    container && "container mx-auto px-4 sm:px-6 lg:px-8",
    centered && "text-center"
  );

  return (
    <motion.section
      className={classes}
      {...animationVariants[animation]}
    >
      <div className={contentClasses}>
        {(title || subtitle) && (
          <motion.div
            className={cn(
              "mb-12",
              centered && "text-center"
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default ProfessionalSection; 