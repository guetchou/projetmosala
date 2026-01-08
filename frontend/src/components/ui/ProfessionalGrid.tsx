import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ProfessionalGridProps {
  children: React.ReactNode;
  columns?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animation?: 'stagger' | 'fade' | 'scale' | 'none';
  staggerDelay?: number;
}

const ProfessionalGrid: React.FC<ProfessionalGridProps> = ({
  children,
  columns = 3,
  gap = 'lg',
  className,
  animation = 'stagger',
  staggerDelay = 0.1
}) => {
  const gapClasses = {
    sm: "gap-4",
    md: "gap-6",
    lg: "gap-8",
    xl: "gap-12"
  };

  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
    6: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"
  };

  const animationVariants = {
    stagger: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.6, ease: "easeOut" }
    },
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.6 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
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
    "grid",
    gridClasses[columns],
    gapClasses[gap],
    className
  );

  const childrenArray = React.Children.toArray(children);

  return (
    <div className={classes}>
      {childrenArray.map((child, index) => (
        <motion.div
          key={index}
          {...animationVariants[animation]}
          transition={{
            ...animationVariants[animation].transition,
            delay: animation === 'stagger' ? index * staggerDelay : 0
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
};

export default ProfessionalGrid; 