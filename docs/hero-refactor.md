# Refactorisation du composant Hero

## 📋 Résumé des changements

Date: $(date +%F_%H%M)
Version: 2.0.0

## 🎯 Objectifs

- Corriger l'espacement avec la navbar (éviter le double padding)
- Améliorer l'accessibilité et les performances (LCP)
- Implémenter des compteurs dynamiques
- Respecter les préférences de motion réduit
- Ajouter des fallbacks robustes
- Optimiser les images et le préchargement

## 🔧 Corrections apportées

### 1. Espacement avec la navbar
- **Avant**: Double padding (`paddingTop` sur section + `pt-32 md:pt-48` sur contenu)
- **Après**: Un seul padding basé sur `navbarHeight`
- **Impact**: Plus de chevauchement avec la navbar

### 2. Fallback sans featuredPost
- **Avant**: Section entière cachée si `posts[0]` undefined
- **Après**: Contenu par défaut toujours affiché
- **Impact**: Hero toujours visible, même sans données

### 3. Image de fond optimisée
- **Avant**: `<motion.img>` avec styles inline
- **Après**: `<picture>` avec WebP + fallback, CSS externalisé
- **Impact**: Meilleur LCP, support WebP, animations optimisées

### 4. Accessibilité améliorée
- **Ajouté**: `role="region"`, `aria-label`, `aria-live="polite"`
- **Ajouté**: Focus visible sur les CTA
- **Ajouté**: Labels descriptifs pour les compteurs

### 5. Compteurs dynamiques
- **Nouveau**: Hook `useKpis()` pour les données
- **Nouveau**: Composant `AnimatedCounter` avec animation
- **Impact**: Données réelles (simulées pour l'instant)

### 6. Respect des préférences motion
- **Nouveau**: Hook `useReducedMotion()`
- **Impact**: Animations désactivées si `prefers-reduced-motion`

### 7. Gradient Mosala
- **Ajouté**: Gradient subtil aux couleurs Mosala
- **Impact**: Cohérence visuelle avec la charte

## 📁 Nouveaux fichiers

```
frontend/src/hooks/useKpis.ts          # Hook pour les KPIs dynamiques
frontend/src/hooks/useReducedMotion.ts # Hook pour les préférences motion
frontend/src/components/ui/AnimatedCounter.tsx # Composant compteur animé
frontend/src/styles/hero.css           # Styles CSS externalisés
frontend/public/hero/                  # Dossier pour les images hero
```

## 🔄 Modifications

### Hero.tsx
- Suppression des styles inline
- Ajout des hooks et composants
- Amélioration de l'accessibilité
- Fallbacks robustes

### index.html
- Ajout du favicon
- Préchargement de l'image LCP
- Préchargement des routes

## 🧪 Tests effectués

- [x] Espacement navbar corrigé
- [x] Fallback sans données fonctionnel
- [x] Animations respectent `prefers-reduced-motion`
- [x] Accessibilité validée (labels, focus)
- [x] Compteurs s'animent à l'apparition
- [x] Image LCP optimisée

## 📊 Impact sur les performances

- **LCP**: Amélioré avec `fetchpriority="high"` et préchargement
- **CLS**: Réduit avec des dimensions fixes
- **Animations**: Optimisées avec `will-change` et CSS externalisé
- **Bundle**: Légère augmentation (hooks + composants)

## 🔙 Rollback

Pour revenir à la version précédente :

```bash
# Restaurer les fichiers de backup
cp backups/hero_refactor_YYYY-MM-DD_HHMM/Hero.tsx frontend/src/components/ui/
cp backups/hero_refactor_YYYY-MM-DD_HHMM/vite.config.ts frontend/
cp backups/hero_refactor_YYYY-MM-DD_HHMM/index.html frontend/

# Supprimer les nouveaux fichiers
rm frontend/src/hooks/useKpis.ts
rm frontend/src/hooks/useReducedMotion.ts
rm frontend/src/components/ui/AnimatedCounter.tsx
rm frontend/src/styles/hero.css
```

## 🚀 Prochaines étapes

1. **API réelle**: Remplacer la simulation par l'appel API réel
2. **Images WebP**: Générer les versions WebP des images hero
3. **Tests unitaires**: Ajouter des tests pour les nouveaux composants
4. **Monitoring**: Ajouter des métriques de performance

## 📝 Notes techniques

- Les compteurs utilisent `Intl.NumberFormat` pour le formatage français
- L'animation des compteurs est basée sur `requestAnimationFrame`
- Le gradient Mosala utilise les couleurs officielles avec faible opacité
- Les préférences motion sont détectées via `matchMedia`
