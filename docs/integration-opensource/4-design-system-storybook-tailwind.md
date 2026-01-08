# 4. Design System & UI : Storybook + Tailwind CSS

## Objectif
Documenter et accélérer le développement d’interfaces cohérentes et réutilisables avec Storybook et Tailwind CSS.

## Prérequis
- Projet frontend React existant
- Node.js et npm installés

## Procédure détaillée

### 1. Installation de Tailwind CSS
```bash
cd frontend
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Configurer `tailwind.config.js` et importer Tailwind dans `src/index.css` :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 2. Installation de Storybook
```bash
npx storybook@latest init
```
- Lancer Storybook :
```bash
npm run storybook
```
- Accéder à http://localhost:6006

### 3. Création de stories pour les composants
- Créer un fichier `MonComposant.stories.tsx` à côté de chaque composant React
- Exemple :
```tsx
import { MonComposant } from './MonComposant';
export default { title: 'UI/MonComposant', component: MonComposant };
export const Default = () => <MonComposant />;
```

### 4. Utilisation de Tailwind dans Storybook
- Storybook détecte automatiquement Tailwind si importé dans le projet
- Vérifier que les styles Tailwind s’appliquent bien dans les stories

## Points de vigilance
- Garder les stories à jour lors de l’évolution des composants
- Utiliser les addons Storybook pour la doc, l’accessibilité, les tests visuels

## Liens utiles
- [Storybook Docs](https://storybook.js.org/docs/react/get-started/introduction)
- [Tailwind CSS Docs](https://tailwindcss.com/docs/installation) 