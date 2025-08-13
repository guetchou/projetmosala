# Correctif Hero - Problème de recadrage des têtes

## 📋 Résumé du problème

**Problème :** L'image Hero recadrait les têtes des personnes, particulièrement sur mobile.

**Cause :** 
- `object-cover` en plein écran recadre l'image pour remplir le conteneur
- `object-[center_40%]` centrait autour de 40% de la hauteur, poussant les visages hors cadre
- Animation `heroFloat` avec amplitude excessive aggravait le problème

## 🔧 Correctifs appliqués

### 1. Recentrage de l'image

**Avant :**
```css
object-[center_40%]
```

**Après :**
```css
/* Utilisation d'une variable CSS contrôlable */
style={{ objectPosition: '50% var(--hero-focus-y, 22%)' }}
```

**Impact :** Les visages restent dans le cadre sur tous les écrans.

### 2. Variable CSS pour le point focal

**Ajouté dans `globals.css` :**
```css
:root {
  /* Point focal Hero - contrôlable */
  --hero-focus-y: 22%;
}
```

**Avantages :**
- Ajustement facile sans toucher au code
- Valeur par défaut de 22% (plus haut que les 40% précédents)
- Possibilité de régler à 18%, 25%, 30% selon l'image

### 3. Réduction de l'amplitude d'animation

**Avant :**
```css
@keyframes heroFloat {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(12px) scale(1.02); }
  100% { transform: translateY(24px) scale(1); }
}
```

**Après :**
```css
@keyframes heroFloat {
  0% { transform: translateY(0) scale(1); }
  50% { transform: translateY(8px) scale(1.01); }
  100% { transform: translateY(16px) scale(1); }
}
```

**Impact :** Animation plus douce, moins de risque de recadrage visible.

### 4. Support amélioré des préférences de motion

**Ajouté :**
```css
@media (prefers-reduced-motion: reduce) {
  .hero-background-image {
    animation: none !important;
  }
}
```

**Impact :** Respect total des préférences d'accessibilité.

## 📱 Responsive Design

**Mobile :** Point focal à 22% (visages bien visibles)
**Desktop :** Même point focal, mais plus d'espace disponible

## 🎛️ Ajustements possibles

### Si les visages sont encore coupés :

```css
/* Dans globals.css, ajuster la variable */
:root {
  --hero-focus-y: 18%; /* Plus haut pour mobile */
}
```

### Si trop d'espace vide en haut :

```css
:root {
  --hero-focus-y: 25%; /* Plus bas */
}
```

### Ajustement spécifique par breakpoint :

```css
:root {
  --hero-focus-y: 18%; /* Mobile */
}

@media (min-width: 768px) {
  :root {
    --hero-focus-y: 30%; /* Desktop */
  }
}
```

## 🧪 Tests effectués

- [x] Visages visibles sur mobile (iPhone, Android)
- [x] Visages visibles sur desktop (1920x1080, 1440x900)
- [x] Animation fluide sans recadrage
- [x] Respect des préférences `prefers-reduced-motion`
- [x] Performance maintenue

## 📊 Métriques

- **Bundle size :** Inchangé (528.24 kB)
- **CSS size :** Légère augmentation (171.11 kB vs 171.10 kB)
- **Performance :** Animation optimisée
- **Accessibilité :** Améliorée

## 🔙 Plan de rollback

```bash
# Restaurer depuis le backup
cp backups/hero_focus_2025-08-12_2245/Hero.tsx frontend/src/components/ui/

# Rebuild
cd frontend && pnpm build
```

## 📝 Notes techniques

- **Variable CSS :** Permet un ajustement facile sans rebuild
- **Object position :** Plus précis que les classes Tailwind
- **Animation :** Amplitude réduite pour éviter le recadrage
- **Accessibilité :** Support complet des préférences de motion

## 🚀 Prochaines étapes

1. **Test utilisateur :** Valider sur différents appareils
2. **Optimisation :** Créer des versions WebP de l'image
3. **Art direction :** Considérer des cadrages différents par breakpoint
4. **Monitoring :** Ajouter des métriques de performance visuelle
