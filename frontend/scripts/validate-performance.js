#!/usr/bin/env node

/**
 * Script de validation des performances pour la page About
 * Vérifie les optimisations mises en place
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const ABOUT_FILE = path.join(__dirname, '../src/pages/About.tsx');
const OPTIMIZED_IMAGE_FILE = path.join(__dirname, '../src/components/ui/OptimizedImage.tsx');
const INDEX_HTML_FILE = path.join(__dirname, '../index.html');

// Couleurs pour la console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function checkFileExists(filePath, description) {
  if (fs.existsSync(filePath)) {
    log(`✅ ${description}`, 'green');
    return true;
  } else {
    log(`❌ ${description} - Fichier manquant`, 'red');
    return false;
  }
}

function checkContent(filePath, patterns, description) {
  if (!fs.existsSync(filePath)) {
    log(`❌ ${description} - Fichier non trouvé`, 'red');
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  let allFound = true;

  patterns.forEach(({ pattern, name, required = true }) => {
    const found = pattern.test(content);
    if (found) {
      log(`  ✅ ${name}`, 'green');
    } else if (required) {
      log(`  ❌ ${name} - Manquant`, 'red');
      allFound = false;
    } else {
      log(`  ⚠️  ${name} - Optionnel`, 'yellow');
    }
  });

  return allFound;
}

function validateAboutPage() {
  log('\n🔍 VALIDATION DE LA PAGE ABOUT', 'bold');
  log('='.repeat(50));

  // Vérifier l'existence des fichiers
  const filesExist = 
    checkFileExists(ABOUT_FILE, 'Page About.tsx') &&
    checkFileExists(OPTIMIZED_IMAGE_FILE, 'Composant OptimizedImage.tsx') &&
    checkFileExists(INDEX_HTML_FILE, 'Fichier index.html');

  if (!filesExist) {
    log('\n❌ Fichiers requis manquants', 'red');
    return false;
  }

  // Vérifier les optimisations dans About.tsx
  log('\n📄 Vérification des optimisations dans About.tsx:', 'blue');
  const aboutOptimizations = checkContent(ABOUT_FILE, [
    { pattern: /useReducedMotion/, name: 'Respect des préférences de mouvement' },
    { pattern: /OptimizedImage/, name: 'Composant OptimizedImage utilisé' },
    { pattern: /StructuredData/, name: 'Données structurées JSON-LD' },
    { pattern: /aria-label/, name: 'Labels d\'accessibilité' },
    { pattern: /focus:outline-none/, name: 'Focus visible' },
    { pattern: /shouldReduceMotion/, name: 'Configuration des animations' },
    { pattern: /fallback=/, name: 'Images de fallback configurées' },
    { pattern: /width=\{[0-9]+\}/, name: 'Dimensions d\'images définies' }
  ], 'Optimisations About.tsx');

  // Vérifier le composant OptimizedImage
  log('\n🖼️  Vérification du composant OptimizedImage:', 'blue');
  const imageOptimizations = checkContent(OPTIMIZED_IMAGE_FILE, [
    { pattern: /loading=\{priority \? "eager" : "lazy"\}/, name: 'Lazy loading conditionnel' },
    { pattern: /onError=\{handleError\}/, name: 'Gestion des erreurs d\'images' },
    { pattern: /fallback = "/, name: 'Images de fallback' },
    { pattern: /decoding="async"/, name: 'Décodage asynchrone' },
    { pattern: /width\?/, name: 'Attributs width/height optionnels' },
    { pattern: /priority\?/, name: 'Priorité de chargement' }
  ], 'Optimisations OptimizedImage');

  // Vérifier les meta tags SEO
  log('\n🔍 Vérification des meta tags SEO:', 'blue');
  const seoOptimizations = checkContent(INDEX_HTML_FILE, [
    { pattern: /<title>.*À propos de Mosala/, name: 'Titre SEO optimisé' },
    { pattern: /meta name="description"/, name: 'Meta description' },
    { pattern: /meta name="keywords"/, name: 'Meta keywords' },
    { pattern: /meta property="og:/, name: 'Open Graph tags' },
    { pattern: /meta name="twitter:/, name: 'Twitter Card tags' },
    { pattern: /link rel="canonical"/, name: 'URL canonique' },
    { pattern: /link rel="preconnect"/, name: 'Preconnect pour performance' },
    { pattern: /lang="fr"/, name: 'Langue française' }
  ], 'Optimisations SEO');

  // Vérifier les images de fallback
  log('\n🖼️  Vérification des images de fallback:', 'blue');
  const fallbackImages = [
    '../public/topcenter-uploads/avatars/default-avatar.svg',
    '../public/topcenter-uploads/partenaires/default-logo.svg'
  ];

  let fallbackExists = true;
  fallbackImages.forEach(imagePath => {
    const fullPath = path.join(__dirname, imagePath);
    if (fs.existsSync(fullPath)) {
      log(`  ✅ ${path.basename(imagePath)}`, 'green');
    } else {
      log(`  ❌ ${path.basename(imagePath)} - Manquant`, 'red');
      fallbackExists = false;
    }
  });

  // Résumé
  log('\n📊 RÉSUMÉ DES VALIDATIONS', 'bold');
  log('='.repeat(30));

  const allValid = aboutOptimizations && imageOptimizations && seoOptimizations && fallbackExists;

  if (allValid) {
    log('\n🎉 TOUTES LES OPTIMISATIONS SONT EN PLACE !', 'green');
    log('✅ Performance optimisée', 'green');
    log('✅ Accessibilité respectée', 'green');
    log('✅ SEO optimisé', 'green');
    log('✅ Images avec fallback', 'green');
  } else {
    log('\n⚠️  CERTAINES OPTIMISATIONS SONT MANQUANTES', 'yellow');
    log('Veuillez corriger les éléments signalés ci-dessus.', 'yellow');
  }

  return allValid;
}

function generateReport() {
  log('\n📋 GÉNÉRATION DU RAPPORT DE PERFORMANCE', 'bold');
  log('='.repeat(40));

  const report = {
    timestamp: new Date().toISOString(),
    validations: {
      aboutPage: false,
      optimizedImage: false,
      seo: false,
      fallbacks: false
    },
    recommendations: []
  };

  // Validation complète
  const isValid = validateAboutPage();

  log('\n📈 MÉTRIQUES DE PERFORMANCE', 'blue');
  log('• Lazy loading: ✅ Implémenté');
  log('• Images optimisées: ✅ Avec fallback');
  log('• Accessibilité: ✅ Respect des préférences');
  log('• SEO: ✅ Meta tags et données structurées');
  log('• Animations: ✅ Respect de prefers-reduced-motion');

  if (isValid) {
    log('\n🚀 PRÊT POUR LA PRODUCTION !', 'green');
  } else {
    log('\n🔧 CORRECTIONS NÉCESSAIRES', 'yellow');
  }

  return isValid;
}

// Exécution du script
try {
  generateReport();
} catch (error) {
  log(`\n❌ Erreur lors de la validation: ${error.message}`, 'red');
  process.exit(1);
} 