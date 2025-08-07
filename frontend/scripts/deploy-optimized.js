#!/usr/bin/env node

/**
 * Script de déploiement avec validation des optimisations
 * Vérifie que toutes les optimisations sont en place avant le build
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

function runCommand(command, description) {
  try {
    log(`\n🔧 ${description}...`, 'blue');
    execSync(command, { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    log(`✅ ${description} - Succès`, 'green');
    return true;
  } catch (error) {
    log(`❌ ${description} - Échec: ${error.message}`, 'red');
    return false;
  }
}

async function validateOptimizations() {
  log('\n🔍 VALIDATION DES OPTIMISATIONS', 'bold');
  log('='.repeat(40));

  // Importer et exécuter le script de validation
  const validationScript = path.join(__dirname, 'validate-performance.js');
  
  try {
    const { generateReport } = await import(validationScript);
    const isValid = generateReport();
    return isValid;
  } catch (error) {
    log(`❌ Erreur lors de la validation: ${error.message}`, 'red');
    return false;
  }
}

function runTests() {
  log('\n🧪 EXÉCUTION DES TESTS', 'bold');
  log('='.repeat(30));

  const testCommands = [
    {
      command: 'npm run test -- --testPathPattern=About.test.tsx --verbose',
      description: 'Tests de la page About'
    },
    {
      command: 'npm run test -- --testPathPattern=OptimizedImage --verbose',
      description: 'Tests du composant OptimizedImage'
    }
  ];

  let allTestsPassed = true;
  
  for (const { command, description } of testCommands) {
    if (!runCommand(command, description)) {
      allTestsPassed = false;
    }
  }

  return allTestsPassed;
}

function buildProject() {
  log('\n🏗️  BUILD DU PROJET', 'bold');
  log('='.repeat(25));

  const buildSteps = [
    {
      command: 'npm run build',
      description: 'Build de production'
    },
    {
      command: 'npm run preview',
      description: 'Vérification du build (démarrage du serveur de preview)'
    }
  ];

  let buildSuccess = true;
  
  for (const { command, description } of buildSteps) {
    if (!runCommand(command, description)) {
      buildSuccess = false;
      break;
    }
  }

  return buildSuccess;
}

function generateDeploymentReport() {
  log('\n📋 RAPPORT DE DÉPLOIEMENT', 'bold');
  log('='.repeat(30));

  const report = {
    timestamp: new Date().toISOString(),
    optimizations: {
      validated: false,
      tests: false,
      build: false
    },
    recommendations: []
  };

  // Validation des optimisations
  log('\n1️⃣ Validation des optimisations...', 'blue');
  const optimizationsValid = validateOptimizations();
  report.optimizations.validated = optimizationsValid;

  if (!optimizationsValid) {
    log('❌ Optimisations manquantes - Déploiement arrêté', 'red');
    return false;
  }

  // Tests
  log('\n2️⃣ Exécution des tests...', 'blue');
  const testsPassed = runTests();
  report.optimizations.tests = testsPassed;

  if (!testsPassed) {
    log('❌ Tests échoués - Déploiement arrêté', 'red');
    return false;
  }

  // Build
  log('\n3️⃣ Build du projet...', 'blue');
  const buildSuccess = buildProject();
  report.optimizations.build = buildSuccess;

  if (!buildSuccess) {
    log('❌ Build échoué - Déploiement arrêté', 'red');
    return false;
  }

  // Succès
  log('\n🎉 DÉPLOIEMENT RÉUSSI !', 'green');
  log('='.repeat(25));
  log('✅ Toutes les optimisations sont validées', 'green');
  log('✅ Tous les tests passent', 'green');
  log('✅ Build de production réussi', 'green');
  log('✅ Prêt pour le déploiement', 'green');

  // Sauvegarder le rapport
  const reportPath = path.join(__dirname, '../deployment-report.json');
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  log(`\n📄 Rapport sauvegardé: ${reportPath}`, 'blue');

  return true;
}

// Fonction principale
async function main() {
  log('🚀 SCRIPT DE DÉPLOIEMENT OPTIMISÉ', 'bold');
  log('='.repeat(40));
  log('Validation des optimisations avant déploiement', 'blue');

  try {
    const success = await generateDeploymentReport();
    
    if (success) {
      log('\n🎯 DÉPLOIEMENT AUTORISÉ', 'green');
      log('Toutes les vérifications sont passées avec succès.', 'green');
      process.exit(0);
    } else {
      log('\n🚫 DÉPLOIEMENT REFUSÉ', 'red');
      log('Veuillez corriger les problèmes signalés avant de redéployer.', 'red');
      process.exit(1);
    }
  } catch (error) {
    log(`\n❌ Erreur critique: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Exécution
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
} 