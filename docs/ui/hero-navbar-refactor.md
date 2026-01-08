# Refactorisation Hero & Navbar - Audit et Correctifs

## 📋 Résumé des changements

Date: 2025-08-12_2226
Version: 3.0.0
Branche: `feat/hero-navbar-polish`

## 🎯 Objectifs

- Corriger la navbar "pilule" qui chevauche le hero
- Éliminer le fond noir résiduel sous le hero
- Optimiser l'overlay pour une meilleure lisibilité
- Assurer un seul H1 par page
- Implémenter des KPI dynamiques
- Ajouter le favicon manquant
- Optimiser le LCP (Largest Contentful Paint)
- Améliorer l'accessibilité

## 🔍 Audit de l'existant

### 1. Navbar.tsx - Problèmes identifiés

**✅ Points positifs :**
- Navbar sticky avec effet glass (`bg-white/60 backdrop-blur-md`)
- Animation de shrink au scroll (`w-2/3` → `w-11/12`)
- Position fixed avec centrage (`fixed top-4 left-1/2 transform -translate-x-1/2`)

**⚠️ Problèmes à corriger :**
- Position `top-4` crée un espacement non désiré
- Pas d'exposition de la hauteur courante au hero
- Effet "pilule" avec `rounded-full` mais pas de bordure visible
- Pas de gestion des préférences de motion réduit

### 2. Hero.tsx - Problèmes identifiés

**✅ Points positifs :**
- Compteurs dynamiques avec hook `useKpis()`
- Respect des préférences motion avec `useReducedMotion()`
- Image optimisée avec `<picture>` et WebP
- Accessibilité avec `role="region"` et `aria-label`

**⚠️ Problèmes à corriger :**
- Double padding : `style={{ paddingTop: navbarHeight + 16 }}` + `pt-32 md:pt-48` (supprimé)
- Image de fallback pointe vers `/topcenter-uploads/` (non optimisée)
- Overlay trop sombre pour la lisibilité
- Pas de gestion de la hauteur viewport complète

### 3. Styles globaux - Problèmes identifiés

**❌ Problèmes critiques :**
- Fond noir potentiel sur le body (à vérifier)
- Pas de variables CSS pour la hauteur de navbar
- Pas de gestion des couleurs Mosala en CSS custom properties

### 4. index.html - Problèmes identifiés

**❌ Problèmes critiques :**
- Favicon manquant ou mal configuré
- Préchargement d'image non optimisé
- Pas de meta tags pour l'accessibilité

## 🔧 Plan de correctifs

### Phase 1: Navbar sticky optimisée
- [ ] Changer `top-4` vers `top-0`
- [ ] Ajouter effet glass avec bordure visible
- [ ] Exposer la hauteur via contexte ou props
- [ ] Optimiser l'animation de shrink

### Phase 2: Hero pleine hauteur
- [ ] Supprimer le double padding
- [ ] Utiliser `min-h-[calc(100svh-var(--nav-h))]`
- [ ] Optimiser l'overlay (gradient Mosala + lisibilité)
- [ ] Corriger le chemin de l'image

### Phase 3: Styles globaux
- [ ] Supprimer tout fond noir
- [ ] Ajouter variables CSS pour la navbar
- [ ] Optimiser les couleurs Mosala

### Phase 4: Head et accessibilité
- [ ] Ajouter favicon Mosala
- [ ] Optimiser le préchargement LCP
- [ ] Vérifier un seul H1 par page
- [ ] Améliorer les contrastes

## 📊 Métriques cibles

- **LCP** : < 2.5s
- **CLS** : < 0.1
- **Accessibilité** : Score WCAG AA
- **Performance** : Lighthouse > 90

## 🔙 Plan de rollback

```bash
# Restaurer depuis le backup
cp backups/hero_navbar_2025-08-12_2226/* frontend/src/components/
cp backups/hero_navbar_2025-08-12_2226/index.html frontend/
cp backups/hero_navbar_2025-08-12_2226/vite.config.ts frontend/

# Rebuild et déployer
cd frontend && pnpm build
```

## 📝 Notes techniques

- Utiliser `100svh` pour la hauteur viewport (évite les barres mobiles)
- Variables CSS : `--nav-h` pour la hauteur navbar
- Gradient Mosala : `from-[#00A651]/10 via-[#FFD700]/10 to-[#ED1C24]/10`
- Animation : respecter `prefers-reduced-motion`
