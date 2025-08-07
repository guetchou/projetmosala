import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  fallback = "/topcenter-uploads/default-image.svg",
  width,
  height,
  priority = false,
  onLoad,
  onError
}) => {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    if (target.src !== fallback) {
      target.src = fallback;
    }
    onError?.();
  };

  const handleLoad = () => {
    onLoad?.();
  };

  return (
    <img 
      src={src} 
      alt={alt} 
      loading={priority ? "eager" : "lazy"}
      width={width}
      height={height}
      onError={handleError}
      onLoad={handleLoad}
      className={className}
      decoding="async"
    />
  );
};

export default OptimizedImage; 