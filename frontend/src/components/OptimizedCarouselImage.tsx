import React from 'react';
import { optimizeCarouselImage, validateImageSize } from '../utils/imageOptimization';

interface OptimizedCarouselImageProps {
  src: string;
  alt: string;
  context?: 'hero' | 'content';
  className?: string;
  priority?: boolean;
}

export function OptimizedCarouselImage({
  src,
  alt,
  context = 'hero',
  className = '',
  priority = false
}: OptimizedCarouselImageProps) {
  const optimizedImage = optimizeCarouselImage(src, context);
  
  return (
    <picture className={className}>
      {/* WebP pour les navigateurs modernes */}
      <source
        srcSet={optimizedImage.srcSet.replace(/\.(jpeg|jpg|png)/g, '.webp')}
        sizes={optimizedImage.sizes}
        type="image/webp"
      />
      
      {/* Image de fallback */}
      <img
        src={optimizedImage.src}
        alt={alt}
        sizes={optimizedImage.sizes}
        srcSet={optimizedImage.srcSet}
        loading={priority ? 'eager' : 'lazy'}
        className="w-full h-full object-cover"
        decoding="async"
      />
    </picture>
  );
}

// Composant pour afficher les informations d'optimisation
export function ImageOptimizationInfo({ src }: { src: string }) {
  // Extraire les dimensions du nom de fichier
  const dimensionsMatch = src.match(/(\d+)x(\d+)/);
  
  if (dimensionsMatch) {
    const width = parseInt(dimensionsMatch[1]);
    const height = parseInt(dimensionsMatch[2]);
    const validation = validateImageSize(width, height);
    
    return (
      <div className="text-xs text-gray-500 mt-2">
        <p>📐 {width}x{height} ({validation.aspectRatio})</p>
        <p>✅ {validation.recommendation}</p>
      </div>
    );
  }
  
  return null;
}
