// 🖼️ Utilitaire d'optimisation des images pour le carousel MOSALA
// Basé sur les recommandations officielles des experts web

export interface ImageSize {
  width: number;
  height: number;
  aspectRatio: string;
  useCase: string;
}

// 📐 Tailles recommandées par les experts
export const RECOMMENDED_IMAGE_SIZES: Record<string, ImageSize> = {
  // Carousel Hero - Images principales
  hero: {
    width: 1920,
    height: 1080,
    aspectRatio: "16:9",
    useCase: "Carousel principal, images hero"
  },
  
  // Carousel Contenu - Articles
  content: {
    width: 1200,
    height: 800,
    aspectRatio: "3:2",
    useCase: "Articles, contenu principal"
  },
  
  // Votre taille actuelle - Optimale pour tablet
  tablet: {
    width: 1536,
    height: 1025,
    aspectRatio: "3:2",
    useCase: "Tablet, carousel intermédiaire"
  },
  
  // Mobile optimisé
  mobile: {
    width: 768,
    height: 512,
    aspectRatio: "3:2",
    useCase: "Mobile, performance optimisée"
  },
  
  // Thumbnail - Petites images
  thumbnail: {
    width: 400,
    height: 267,
    aspectRatio: "3:2",
    useCase: "Thumbnails, aperçus"
  }
};

// 🎯 Fonction pour obtenir la taille optimale selon le contexte
export function getOptimalImageSize(useCase: keyof typeof RECOMMENDED_IMAGE_SIZES): ImageSize {
  return RECOMMENDED_IMAGE_SIZES[useCase];
}

// 📱 Fonction pour générer les URLs d'images responsives
export function generateResponsiveImageUrls(
  baseImagePath: string,
  sizes: (keyof typeof RECOMMENDED_IMAGE_SIZES)[] = ['mobile', 'tablet', 'hero']
): Record<string, string> {
  const urls: Record<string, string> = {};
  
  sizes.forEach(size => {
    const imageSize = RECOMMENDED_IMAGE_SIZES[size];
    const fileName = baseImagePath.split('/').pop()?.split('.')[0];
    const extension = baseImagePath.split('.').pop();
    
    urls[size] = `${baseImagePath.replace(
      `${fileName}.${extension}`,
      `${fileName}-${imageSize.width}x${imageSize.height}.${extension}`
    )}`;
  });
  
  return urls;
}

// 🚀 Fonction pour optimiser les images du carousel
export function optimizeCarouselImage(imagePath: string, context: 'hero' | 'content' = 'hero'): {
  src: string;
  sizes: string;
  srcSet: string;
} {
  const basePath = imagePath.split('.')[0];
  const extension = imagePath.split('.').pop();
  
  const sizes = context === 'hero' 
    ? ['mobile', 'tablet', 'hero'] 
    : ['mobile', 'content'];
  
  const responsiveUrls = generateResponsiveImageUrls(imagePath, sizes);
  
  return {
    src: imagePath, // Image par défaut
    sizes: context === 'hero' 
      ? "(max-width: 768px) 768px, (max-width: 1024px) 1536px, 1920px"
      : "(max-width: 768px) 768px, 1200px",
    srcSet: Object.entries(responsiveUrls)
      .map(([size, url]) => {
        const imageSize = RECOMMENDED_IMAGE_SIZES[size as keyof typeof RECOMMENDED_IMAGE_SIZES];
        return `${url} ${imageSize.width}w`;
      })
      .join(', ')
  };
}

// 📊 Validation des tailles d'images
export function validateImageSize(width: number, height: number): {
  isValid: boolean;
  recommendation: string;
  aspectRatio: string;
} {
  const aspectRatio = (width / height).toFixed(2);
  const ratio = width / height;
  
  // Vérification des ratios recommandés
  const is16by9 = Math.abs(ratio - 16/9) < 0.1;
  const is3by2 = Math.abs(ratio - 3/2) < 0.1;
  const is4by3 = Math.abs(ratio - 4/3) < 0.1;
  
  let recommendation = "";
  let isValid = false;
  
  if (is16by9) {
    recommendation = "Ratio 16:9 - Parfait pour les images hero/carousel principal";
    isValid = true;
  } else if (is3by2) {
    recommendation = "Ratio 3:2 - Excellent pour le contenu et articles";
    isValid = true;
  } else if (is4by3) {
    recommendation = "Ratio 4:3 - Bon pour les thumbnails";
    isValid = true;
  } else {
    recommendation = `Ratio ${aspectRatio} - Considérez 16:9 ou 3:2 pour une meilleure compatibilité`;
  }
  
  return {
    isValid,
    recommendation,
    aspectRatio
  };
}

// 🎨 Exemple d'utilisation pour votre carousel
export const MOSALA_CAROUSEL_OPTIMIZATION = {
  // Votre image actuelle analysée
  currentImage: {
    path: "images-mosala/photos-projet-mosala/mosala-lancement-1536x1025.jpeg",
    size: RECOMMENDED_IMAGE_SIZES.tablet,
    validation: validateImageSize(1536, 1025)
  },
  
  // Recommandations pour optimiser
  recommendations: {
    hero: "Utilisez 1920x1080 pour un impact maximal sur desktop",
    tablet: "Votre taille 1536x1025 est parfaite pour tablet ✅",
    mobile: "Ajoutez une version 768x512 pour mobile",
    performance: "Utilisez WebP ou AVIF pour une compression optimale"
  }
};
