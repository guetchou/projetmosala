# Automatisation des Rôles Supabase - Guide Complet

## 📋 Résumé des modifications

### 1. Frontend - AuthContext.tsx
✅ **Fonction `register()`**: Accepte les métadonnées et les passe à Supabase via `options.data`
✅ **Fonction `login()`**: Récupère le rôle depuis `user_metadata?.role` avec fallback à `expectedRole`

### 2. Formulaires d'inscription
✅ **SuperAdminRegister.tsx**: Envoie `{ role: 'superadmin' }` lors de l'inscription
✅ **AdminContentRegister.tsx**: Envoie `{ role: 'admin_content' }` lors de l'inscription

### 3. Formulaires de connexion  
✅ **SuperAdminLogin.tsx**: Passe `expectedRole: 'superadmin'` au login
✅ **AdminContentLogin.tsx**: Passe `expectedRole: 'admin_content'` au login

## 🔧 Configuration Supabase (Étapes à suivre)

### Étape 1: Exécuter le script SQL

1. Allez sur https://supabase.com et connectez-vous à votre projet
2. Cliquez sur **SQL Editor** dans le menu gauche
3. Créez une nouvelle requête
4. Copiez le contenu de `docs/SUPABASE_ROLE_SYNC_TRIGGER.sql`
5. Collez-le dans l'éditeur SQL
6. Cliquez sur **Run** (ou Ctrl+Enter)

Ce script va:
- ✅ Créer la table `public.profiles` 
- ✅ Créer une fonction de trigger pour synchroniser les rôles
- ✅ Configurer les stratégies RLS (Row Level Security)

### Étape 2: Tester le flux d'inscription

1. Allez à `http://localhost:1199/superadmin/register`
2. Créez un compte superadmin:
   - Nom: "Test Superadmin"
   - Email: "superadmin@test.com"
   - Mot de passe: "TestPass123!"
3. Vous devriez être redirigé vers `/superadmin/dashboard`

**Dans la console (F12 > Console), vous verrez:**
```
[AuthContext.register] Registration data: { email: 'superadmin@test.com', role: 'superadmin', name: 'Test Superadmin' }
[AuthContext.register] Metadata to be stored: { name: 'Test Superadmin', role: 'superadmin' }
[AuthContext.register] Supabase options: { data: { name: 'Test Superadmin', role: 'superadmin' } }
```

### Étape 3: Vérifier dans Supabase

1. Dans le Dashboard Supabase, allez à **Table Editor**
2. Sélectionnez la table `profiles`
3. Vous devriez voir votre utilisateur avec:
   - `id`: UUID générée par Supabase
   - `email`: superadmin@test.com
   - `name`: Test Superadmin
   - `role`: superadmin ✅

## 🔐 Sécurité RLS (Row Level Security)

Les stratégies RLS suivantes ont été configurées:

1. **Voir son propre profil**: Chaque utilisateur peut voir ses informations
2. **Superadmins voient tout**: Les superadmins peuvent voir tous les profils
3. **Mettre à jour son profil**: Les utilisateurs peuvent mettre à jour leurs propres données

## 📝 Commandes SQL utiles

### Vérifier les métadonnées stockées:
```sql
SELECT id, email, raw_user_meta_data FROM auth.users WHERE email = 'superadmin@test.com';
```

### Voir tous les profils créés:
```sql
SELECT id, email, name, role, created_at FROM public.profiles;
```

### Voir uniquement les superadmins:
```sql
SELECT * FROM public.superadmins;
```

### Synchroniser les utilisateurs existants:
```sql
SELECT * FROM public.sync_existing_users();
```

### Mettre à jour manuellement le rôle d'un utilisateur:
```sql
UPDATE public.profiles 
SET role = 'superadmin', updated_at = CURRENT_TIMESTAMP
WHERE email = 'user@example.com';
```

## 🐛 Dépannage

### Le rôle n'apparaît pas dans les métadonnées?

1. Vérifiez que le script SQL a bien été exécuté
2. Vérifiez que la table `public.profiles` existe:
   ```sql
   SELECT * FROM public.profiles WHERE email = 'your-email@example.com';
   ```
3. Regardez les logs dans la console du navigateur (F12 > Console)

### Les redirections ne fonctionnent pas?

1. Vérifiez que `getUserRole()` retourne le bon rôle dans `auth_user` du localStorage
2. Vérifiez les logs: `[AuthContext.login] Final role: superadmin`
3. Confirmez que le `ProtectedRoute` reçoit le bon rôle

### Les métadonnées ne sont pas synchronisées?

1. Le trigger ne se déclenche que lors de la **création** d'un utilisateur via `supabase.auth.signUp()`
2. Pour synchroniser les utilisateurs existants, exécutez:
   ```sql
   SELECT * FROM public.sync_existing_users();
   ```

## 📊 Flux d'authentification

```
┌─────────────────────────────────────────────────────────────────┐
│                   Inscription (SuperAdminRegister)              │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
        ┌────────────────────────────────────┐
        │  register({                        │
        │    name, email, password,          │
        │    role: 'superadmin'              │
        │  })                                │
        └────────────┬───────────────────────┘
                     │
                     ▼
      ┌──────────────────────────────────────┐
      │  AuthContext.register()              │
      │  - Crée métadonnées: { role, name } │
      │  - Appelle supabase.auth.signUp()   │
      └──────────────┬───────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────┐
        │  Supabase                          │
        │  - Crée user dans auth.users       │
        │  - Stocke métadonnées              │
        │  - Trigger déclenché ✅           │
        └──────────────┬───────────────────────┘
                     │
                     ▼
        ┌────────────────────────────────────┐
        │  Trigger handle_new_user()         │
        │  - Insère dans public.profiles     │
        │  - Synchronise le rôle ✅        │
        └──────────────┬───────────────────────┘
                     │
                     ▼
         ┌───────────────────────────────────┐
         │  Utilisateur créé avec rôle! ✅  │
         │  - Stocké dans localStorage       │
         │  - Redirigé vers /superadmin/...  │
         └───────────────────────────────────┘
```

## 🎯 Connexion (SuperAdminLogin)

```
┌─────────────────────────────────────────────────┐
│         Connexion (SuperAdminLogin)             │
└────────────────────┬────────────────────────────┘
                     │
                     ▼
    ┌─────────────────────────────────────┐
    │  login(email, password, endpoint,   │
    │        expectedRole: 'superadmin')  │
    └────────────────┬────────────────────┘
                     │
                     ▼
  ┌──────────────────────────────────────┐
  │  AuthContext.login() + Supabase      │
  │  - Appelle supabase.auth.signIn()    │
  │  - Récupère user_metadata            │
  └──────────────┬───────────────────────┘
                     │
                     ▼
    ┌────────────────────────────────────────┐
    │  Role resolution:                      │
    │  1. user_metadata?.role ('superadmin') │
    │  2. expectedRole ('superadmin')        │
    │  3. default ('admin')                  │
    │  Result: 'superadmin' ✅              │
    └─────────────┬──────────────────────────┘
                     │
                     ▼
      ┌──────────────────────────────────┐
      │  ProtectedRoute vérification      │
      │  Rôle attendu: 'superadmin'      │
      │  Rôle obtenu: 'superadmin' ✅   │
      │  → Accès autorisé!               │
      └──────────────┬───────────────────┘
                     │
                     ▼
       ┌──────────────────────────────────┐
       │  Redirection vers dashboard      │
       │  /superadmin/dashboard ✅        │
       └──────────────────────────────────┘
```

## ✅ Checklist d'implémentation

- [x] Frontend modifications (AuthContext, SuperAdminRegister, etc.)
- [x] Build frontend vérifié
- [ ] Script SQL exécuté dans Supabase
- [ ] Table `public.profiles` créée
- [ ] Trigger `on_auth_user_created` activé
- [ ] Tester inscription d'un superadmin
- [ ] Vérifier les métadonnées dans Supabase
- [ ] Tester connexion d'un superadmin
- [ ] Vérifier redirection vers dashboard
- [ ] Tester la table profiles est bien synchronisée

## 📞 Support

Si vous rencontrez des problèmes:
1. Vérifiez les logs dans la console du navigateur (F12 > Console)
2. Vérifiez les métadonnées dans Supabase:
   - Dashboard > SQL Editor > `SELECT * FROM auth.users WHERE email = 'your-email@example.com';`
3. Vérifiez la table profiles:
   - Dashboard > Table Editor > Sélectionnez `profiles`
