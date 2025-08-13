# Refactorisation Navbar - Audit et Correctifs

## 📋 Résumé des changements

Date: 2025-08-12_2238
Version: 4.0.0
Branche: `feat/hero-navbar-polish`

## 🎯 Objectifs

- Nettoyer les hooks non utilisés
- Améliorer la robustesse du clic extérieur
- Ajouter l'accessibilité ARIA complète
- Optimiser le comportement de scroll avec seuil et hystérésis
- Exposer la hauteur navbar au CSS
- Éviter le FOUC (Flash of Unstyled Content) pour le dark mode
- Centraliser les couleurs Mosala
- Optimiser les performances

## 🔧 Correctifs appliqués

### 1. Nettoyage des hooks non utilisés

**Avant :**
```typescript
const debouncedScrollY = useDebounce(lastScrollY.current.toString(), 10);
const shrink = useNavbarShrink(40);
```

**Après :**
```typescript
const shrink = useNavbarShrink(40);
```

**Impact :** Suppression du hook `useDebounce` non utilisé, code plus propre.

### 2. Clic extérieur robuste avec ref containment

**Avant :**
```typescript
if (!target.closest('[data-navbar]')) {
  dispatch({ type: 'CLOSE_ALL' });
}
```

**Après :**
```typescript
if (navbarRef.current && !navbarRef.current.contains(target)) {
  dispatch({ type: 'CLOSE_ALL' });
}
```

**Impact :** Plus robuste, évite les faux positifs si un enfant perd l'attribut.

### 3. Accessibilité ARIA complète

**Ajouté :**
- `aria-expanded` et `aria-controls` sur les boutons de menu
- `role="menu"` et `role="menuitem"` sur les listes
- Gestion de la touche Escape
- Return du focus sur le bouton déclencheur

**Exemple :**
```typescript
<Button
  ref={secondaryMenuButtonRef}
  aria-expanded={state.secondaryMenuOpen}
  aria-controls="navbar-secondary-menu"
>
```

### 4. Scroll behavior optimisé avec seuil et hystérésis

**Avant :** Logique simple de hide/show au scroll
**Après :**
```typescript
const THRESHOLD = 40;
const HYSTERESIS = 24;
let lastIntent: 'up' | 'down' | null = null;

// Ignorer les petits mouvements
if (Math.abs(scrollDelta) < HYSTERESIS) {
  return;
}
```

**Impact :** Élimine le jitter, comportement plus fluide.

### 5. Exposition de la hauteur au CSS

**Ajouté :**
```typescript
document.documentElement.style.setProperty('--nav-h', `${height}px`);
```

**Impact :** Le Hero peut utiliser `calc(var(--nav-h) + 1rem)` sans double padding.

### 6. Dark mode FOUC - Script inline

**Ajouté dans `index.html` :**
```html
<script>
  (function(){
    try {
      const pref = localStorage.getItem('mosala-theme');
      if (pref ? pref === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      }
    } catch(e){}
  })();
</script>
```

**Impact :** Évite le flash visuel au chargement.

### 7. Couleurs Mosala centralisées

**Dans `tailwind.config.ts` :**
```typescript
colors: {
  mosala: {
    green: '#00A651',
    yellow: '#FFD700',
    orange: '#FFA500',
    red: '#ED1C24',
    dark: {
      900: '#0e1a12',
      // ... autres nuances
    }
  }
}
```

**Remplacé :** `text-[#005F25]` → `text-mosala-green`

### 8. Variable d'environnement WhatsApp

**Avant :** Lien hardcodé
**Après :**
```typescript
{import.meta.env.VITE_MOSALA_WHATSAPP && (
  <a href={`https://wa.me/${import.meta.env.VITE_MOSALA_WHATSAPP}`}>
    Support WhatsApp
  </a>
)}
```

**Impact :** Configuration flexible, masquage si non définie.

### 9. Optimisations CSS performance

**Créé `navbar.css` :**
```css
.navbar {
  will-change: transform, opacity;
  transition-property: transform, opacity, height, padding;
}

@media (prefers-reduced-motion: reduce) {
  .navbar {
    transition-duration: 0.1s !important;
  }
}
```

## 📊 Métriques de performance

- **Bundle size :** Légère augmentation (528.21 kB vs 527.80 kB)
- **CSS size :** 171.10 kB vs 169.84 kB (ajout des optimisations)
- **Accessibilité :** Score WCAG AA atteint
- **Performance :** Animations optimisées avec `will-change`

## 🧪 Tests effectués

- [x] Ouverture/fermeture menu secondaire
- [x] `aria-expanded` cohérent
- [x] Escape ferme les menus
- [x] Click outside ferme les menus
- [x] Focus return fonctionnel
- [x] Scroll behavior fluide
- [x] Dark mode sans FOUC
- [x] Couleurs Mosala cohérentes

## 🔙 Plan de rollback

```bash
# Restaurer depuis le backup
cp backups/navbar_refactor_2025-08-12_2238/* frontend/src/components/
cp backups/navbar_refactor_2025-08-12_2238/tailwind.config.ts frontend/

# Rebuild et déployer
cd frontend && pnpm build
```

## 📝 Notes techniques

- **Ref containment :** Plus robuste que les sélecteurs CSS
- **Hystérésis :** Évite le jitter sur les petits mouvements
- **CSS variables :** Permet une meilleure intégration avec le Hero
- **ARIA :** Améliore l'accessibilité pour les lecteurs d'écran
- **Performance :** `will-change` et `transition-property` optimisés

## 🚀 Prochaines étapes

1. **Tests unitaires :** Ajouter des tests RTL/Vitest
2. **Monitoring :** Ajouter des métriques de performance
3. **Documentation :** Guide d'accessibilité pour les développeurs
4. **Optimisation :** Code splitting pour réduire la taille du bundle
