# 🔍 Guide de Dépannage - Administrateurs n'apparaissent pas

**Problème**: La liste des administrateurs ne s'affiche pas dans le tableau de bord, même si des administrateurs sont inscrits dans la base de données.

---

## 🚀 Étape 1: Accédez au Diagnostic (30 sec)

1. Allez à **Admin Dashboard → Gérer les administrateurs**
2. Un nouveau composant **"🔍 Diagnostic Supabase"** apparaîtra en haut
3. Examinez les résultats des 6 tests

---

## 📊 Interprétation des Résultats

### ✅ Si tous les tests sont VERTS (Success)
- Votre connexion Supabase fonctionne correctement
- Vérifiez que la liste n'est pas vide
- Le problème peut être un cache du navigateur

**Solution**: 
```
Ctrl+F5 (Windows) ou Cmd+Shift+R (macOS)
```

---

### ❌ Si Test 1 "Configuration Supabase" est ROUGE

**Problème**: Les variables d'environnement ne sont pas chargées

**Solution**:
1. Vérifiez `/frontend/.env`
2. Assurez-vous qu'il contient:
   ```
   VITE_SUPABASE_URL=https://...
   VITE_SUPABASE_ANON_KEY=eyJ...
   ```
3. Redémarrez le serveur de développement:
   ```bash
   npm run dev
   # ou
   pnpm dev
   ```

---

### ❌ Si Test 2 "Authentification" est ORANGE (Warning)

**Problème**: Aucune session utilisateur active

**Solution**:
1. Déconnectez-vous
2. Reconnectez-vous avec votre compte superadmin
3. Vérifiez que vous êtes connecté en tant que superadmin

---

### ❌ Si Test 3 "Accès à la table users" est ROUGE

**Problème**: Impossible d'accéder à la table `users` (problème de RLS)

**Erreurs possibles**:
- `PGRST106` - Erreur d'authentification
- `PGRST116` - Erreur de permission

**Solutions**:

#### Option A: Désactiver les RLS temporairement (pour tester)
1. Allez sur [Supabase Dashboard](https://app.supabase.com)
2. Naviguez vers **Auth → Policies**
3. Sélectionnez la table `users`
4. **Désactivez les RLS** (bouton toggle)
5. Testez si la liste des admins s'affiche

#### Option B: Corriger les RLS
1. Allez dans **Supabase Dashboard → SQL Editor**
2. Exécutez cette requête pour voir les RLS actuels:
   ```sql
   SELECT schemaname, tablename, policyname, permissive, roles, qual, with_check
   FROM pg_policies
   WHERE tablename = 'users';
   ```
3. Si des RLS restrictifs existent, créez une nouvelle politique:
   ```sql
   CREATE POLICY "Allow authenticated users to select"
   ON users
   FOR SELECT
   TO authenticated
   USING (auth.uid() = id OR auth.jwt()->>'role' = 'superadmin');
   ```

---

### ❌ Si Test 4 "Comptage des administrateurs" est ORANGE (Warning)

**Problème**: Aucun administrateur dans la base de données

**Solution**:
1. Allez à **Gérer les administrateurs**
2. Cliquez **"Ajouter un administrateur"**
3. Remplissez:
   - Nom
   - Email
   - Rôle (superadmin, admin, ou admin_content)
4. Cliquez **"Créer"**
5. Relancez le diagnostic

---

### ❌ Si Test 5 "Récupération avec filtre is_active" est ROUGE

**Problème**: La colonne `is_active` n'existe pas ou est inaccessible

**Solutions**:

#### Vérifiez que la colonne existe
1. **Supabase Dashboard → SQL Editor**
2. Exécutez:
   ```sql
   SELECT column_name, data_type
   FROM information_schema.columns
   WHERE table_name = 'users'
   ORDER BY ordinal_position;
   ```
3. Si `is_active` n'existe pas, créez-la:
   ```sql
   ALTER TABLE users
   ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true;
   ```

#### Mettez à jour l'API si vous avez supprimé le filtre
1. Allez à `/frontend/src/api/admins.ts`
2. Cherchez la fonction `getAll()`
3. **Commentez ou supprimez** `.eq('is_active', true)` si la colonne n'existe pas:
   ```typescript
   const { data, error } = await supabase
     .from('users')
     .select('id, name, email, role, created_at, updated_at')
     // .eq('is_active', true)  ← Commentez cette ligne
     .order('created_at', { ascending: false });
   ```

---

### ❌ Si Test 6 "Récupération sans filtre" est ROUGE

**Problème**: Complètement impossible de récupérer les données de la table `users`

**Solutions urgentes**:

1. **Vérifiez que la table existe**:
   ```sql
   SELECT table_name
   FROM information_schema.tables
   WHERE table_schema = 'public'
   AND table_name = 'users';
   ```

2. **Si la table n'existe pas, créez-la**:
   ```sql
   CREATE TABLE IF NOT EXISTS users (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     name TEXT,
     email TEXT UNIQUE,
     role VARCHAR(50) DEFAULT 'admin',
     is_active BOOLEAN DEFAULT true,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   ```

3. **Vérifiez les permissions de la clé API**:
   - Allez à **Supabase Dashboard → Settings → API**
   - Vérifiez que vous utilisez la bonne clé anon

---

## 🛠️ Fixes Rapides à Essayer d'Abord

### Fix 1: Actualiser Complètement
```
Ctrl+Shift+Delete (Windows) - Ouvre la fenêtre de nettoyage du cache
ou
Ctrl+F5 - Actualise avec cache vide
```

### Fix 2: Vérifier la Console du Navigateur
```
Appuyez sur F12
→ Onglet Console
→ Cherchez les messages d'erreur rouges
→ Copiez l'erreur exacte
```

### Fix 3: Vérifier les Logs Supabase
```
1. Supabase Dashboard
2. Logs → Edge Function Logs ou Query Performance
3. Cherchez les erreurs avec status 403/401
```

### Fix 4: Supprimer le Stockage Local
```
F12 → Application → Local Storage
→ Supprimez toutes les entrées avec "supabase" ou "auth"
→ Reconnectez-vous
```

---

## 📋 Checklist de Diagnostic

- [ ] Diagnostic Supabase lancé
- [ ] Tous les 6 tests examinés
- [ ] Erreurs notées
- [ ] Console du navigateur ouverte (F12)
- [ ] Aucun message d'erreur rouge dans la console
- [ ] Table `users` existe dans Supabase
- [ ] Colonne `is_active` existe (si utilisée)
- [ ] Au moins 1 admin dans la base de données
- [ ] RLS ne bloque pas l'accès
- [ ] Clé API correcte

---

## 🔐 RLS (Row Level Security) - À Vérifier

Allez à **Supabase Dashboard → Authentication → Policies**

Pour la table `users`, vérifiez qu'il existe une politique permettant:
- ✅ SELECT pour les utilisateurs authentifiés
- ✅ INSERT pour les superadmins
- ✅ UPDATE pour les propriétaires
- ✅ DELETE pour les superadmins

**Politique Recommandée**:
```sql
-- Permet à tous les authentifiés de lire
CREATE POLICY "Allow authenticated to select users"
ON users
FOR SELECT
TO authenticated
USING (true);

-- Permet aux superadmins d'insérer
CREATE POLICY "Allow superadmin to insert users"
ON users
FOR INSERT
TO authenticated
WITH CHECK (auth.jwt()->>'role' = 'superadmin');

-- Permet aux superadmins de mettre à jour
CREATE POLICY "Allow superadmin to update users"
ON users
FOR UPDATE
TO authenticated
USING (auth.jwt()->>'role' = 'superadmin')
WITH CHECK (auth.jwt()->>'role' = 'superadmin');

-- Permet aux superadmins de supprimer
CREATE POLICY "Allow superadmin to delete users"
ON users
FOR DELETE
TO authenticated
USING (auth.jwt()->>'role' = 'superadmin');
```

---

## 📞 Messages d'Erreur Courants

### `PGRST106 Permission denied`
**Cause**: RLS bloque l'accès  
**Fix**: Vérifiez les RLS

### `PGRST116 Unknown table`
**Cause**: Table n'existe pas  
**Fix**: Créez la table

### `Error: relation "users" does not exist`
**Cause**: Table `users` n'existe pas  
**Fix**: Créez la table

### `Column "is_active" does not exist`
**Cause**: Colonne manquante  
**Fix**: Créez la colonne ou supprimez le filtre

---

## 🚀 Après le Fix

Une fois le problème résolu:

1. ✅ Relancez le diagnostic
2. ✅ Vérifiez que tous les tests sont verts
3. ✅ La liste des administrateurs doit s'afficher
4. ✅ Créez un nouvel administrateur pour tester

---

## 📞 Besoin d'Aide?

**Erreur spécifique?** Copiez le message d'erreur exacte du diagnostic ou de la console (F12)

**Questions?** Consultez:
- `MIGRATION_EXECUTION_GUIDE.md` - Pour les modifications de schéma
- `ADMIN_IMPLEMENTATION_SUMMARY.md` - Pour la structure admin
- Supabase Documentation - https://supabase.com/docs

---

*Créé le 11 février 2026*  
*Guide de dépannage - Super Admin Dashboard*
