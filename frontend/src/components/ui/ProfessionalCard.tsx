import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProfessionalCardProps {
  variant?: 'default' | 'elevated' | 'outlined' | 'hero';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  hover?: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

const ProfessionalCard: React.FC<ProfessionalCardProps> = ({
  variant = 'default',
  padding = 'md',
  hover = true,
  children,
  className,
  onClick,
  as: Component = 'div'
}) => {
  const baseClasses = "rounded-2xl transition-all duration-300";
  
  const variantClasses = {
    default: "bg-white shadow-sm border border-gray-100",
    elevated: "bg-white shadow-lg hover:shadow-xl border border-gray-100",
    outlined: "bg-transparent border-2 border-gray-200",
    hero: "bg-gradient-to-br from-white/95 to-white/90 backdrop-blur-xl shadow-xl border border-gray-100"
  };

  const paddingClasses = {
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
    xl: "p-10"
  };

  const hoverClasses = hover ? "hover:-translate-y-1 hover:shadow-lg" : "";

  const classes = cn(
    baseClasses,
    variantClasses[variant],
    paddingClasses[padding],
    hoverClasses,
    className
  );

  const MotionComponent = motion[Component as keyof typeof motion] || motion.div;

  return (
    <MotionComponent
      className={classes}
      onClick={onClick}
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </MotionComponent>
  );
};

export default ProfessionalCard; 