# Configuration Supabase - Guide Complet

## 1. Vérifier les Tables en Supabase

Les trois tables suivantes DOIVENT exister dans votre projet Supabase:

### Table `users`
```
- id: SERIAL PRIMARY KEY
- name: VARCHAR(100) NOT NULL
- email: VARCHAR(255) NOT NULL UNIQUE
- password: VARCHAR(255) (optionnel, géré par Supabase Auth)
- role: user_role ENUM ('admin', 'admin_content', 'superadmin')
- is_active: BOOLEAN DEFAULT true
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
```

### Table `news` (Actualités)
```
- id: SERIAL PRIMARY KEY
- title: VARCHAR(200) NOT NULL
- description: TEXT NOT NULL
- content: TEXT NOT NULL
- image_url: VARCHAR(500) (optionnel)
- link: VARCHAR(500) (optionnel)
- is_published: BOOLEAN DEFAULT true
- is_featured: BOOLEAN DEFAULT false
- category: VARCHAR(50) DEFAULT 'news'
- author_id: INTEGER FK → users(id)
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
```

### Table `formations_advanced` (Formations)
```
- id: SERIAL PRIMARY KEY
- title: VARCHAR(200) NOT NULL
- description: TEXT NOT NULL
- content: TEXT NOT NULL
- image_url: VARCHAR(500) (optionnel)
- level: formation_level ENUM ('beginner', 'intermediate', 'advanced')
- status: formation_status ENUM ('draft', 'published', 'archived')
- duration: INTEGER DEFAULT 12 (heures)
- max_participants: INTEGER DEFAULT 50
- current_participants: INTEGER DEFAULT 0
- price: DECIMAL(10, 2) (optionnel)
- prerequisites: VARCHAR(500)
- author_id: INTEGER FK → users(id)
- created_at: TIMESTAMP WITH TIME ZONE
- updated_at: TIMESTAMP WITH TIME ZONE
```

## 2. Créer les Tables

Si les tables n'existent pas, exécutez le script SQL dans Supabase:

### Étapes:
1. Allez sur https://app.supabase.com
2. Sélectionnez votre projet
3. Cliquez sur "SQL Editor" (menu gauche)
4. Cliquez "New Query"
5. Copiez-collez le contenu de `SUPABASE_MIGRATION.sql`
6. Cliquez "RUN"

## 3. Vérifier les Permissions (RLS)

Les tables doivent avoir Row Level Security (RLS) activé:

```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE formations_advanced ENABLE ROW LEVEL SECURITY;
```

### Politiques recommandées:
- Lectures publiques (select): Tout le monde peut lire les contenus publiés
- Écritures: Seulement utilisateurs authentifiés avec rôle approprié

## 4. Tester depuis le Frontend

Le dashboard admin utilise maintenant Supabase directement!

### Services API disponibles:
```typescript
// /frontend/src/api/formations.ts
import { formationsAPI } from '@/api/formations';

// Récupérer toutes les formations
const formations = await formationsAPI.getAll();

// Créer une formation
const nouvelleFormation = await formationsAPI.create({
  titre: 'React Avancé',
  description: 'Description...',
  duree: '40',
  domaine: 'intermediate'
});

// Mettre à jour
await formationsAPI.update(id, formation);

// Supprimer
await formationsAPI.delete(id);
```

Même interface pour:
- `actualitesAPI` (table `news`)
- `adminsAPI` (table `users`)

## 5. Tester en Temps Réel

Pour tester l'ajout/affichage:

1. Allez sur le dashboard: `http://localhost:5173/superadmin/dashboard`
2. Connectez-vous avec le compte superadmin
3. Cliquez sur les sections (Formations, Actualités, Administrateurs)
4. Ajoutez des éléments de test

Les données s'affichent instantanément depuis Supabase!

## 6. Problèmes Courants

### ❌ "Erreur lors du chargement"
- Vérifiez que les tables existent en Supabase
- Vérifiez les logs du navigateur (F12 → Console)

### ❌ "Permission denied"
- Vérifiez les RLS policies
- Pour développement, vous pouvez desactiver RLS temporairement

### ❌ Données ne sauvegardent pas
- Vérifiez les erreurs console (F12)
- Vérifiez que vous êtes connecté (token Supabase)

## 7. Structure des Fichiers

```
/frontend/src/
├── api/
│   ├── formations.ts    (← Utilise Supabase)
│   ├── actualites.ts    (← Utilise Supabase)
│   └── admins.ts        (← Utilise Supabase)
├── lib/
│   └── supabase.ts      (← Client Supabase)
├── pages/admin/
│   ├── SuperAdminDashboard.tsx
│   └── components/
│       ├── FormationsSection.tsx
│       ├── ActualitesSection.tsx
│       └── AdministrateursSection.tsx
└── contexts/
    └── AuthContext.tsx   (← Supabase Auth)
```

## 8. Prochaines Étapes

- [ ] Vérifier les tables en Supabase
- [ ] Créer les tables avec SUPABASE_MIGRATION.sql si nécessaire
- [ ] Tester l'ajout de formations
- [ ] Tester l'ajout d'actualités
- [ ] Tester l'ajout d'administrateurs
- [ ] Configurer les règles RLS pour la production
- [ ] Ajouter les validations côté serveur
- [ ] Implémenter les confirmations de suppression

## 9. Contacts & Ressources

- Supabase Docs: https://supabase.com/docs
- Projet Supabase: https://app.supabase.com/projects/ikugkkubbyoohfpqcoum
- Code des API: `/frontend/src/api/`
