# Guide de test - SuperAdmin Dashboard

## 🚀 Démarrage

### Prérequis
- Frontend React démarré sur `http://localhost:5173`
- Backend Express démarré sur `http://localhost:3001` (ou configuré)
- Supabase projet configuré avec credentials valides
- Variables d'environnement `.env` complètes

### URL d'accès
```
http://localhost:5173/superadmin/dashboard
```

---

## ✅ Tests étape par étape

### 1️⃣ Accès au dashboard (Sécurité)

**Test** :
```
1. Se connecter en tant que superadmin
   - Email : votre@superadmin.com
   - Rôle dans Supabase : 'superadmin'

2. Accéder à /superadmin/dashboard
   → Devrait afficher le dashboard
   
3. Essayer d'accéder avec un admin normal (rôle 'admin')
   → Devrait être redirigé /superadmin/login
```

**Résultat attendu** : ✅ Seul un superadmin peut accéder

---

### 2️⃣ Affichage du diagnostic

**Test** :
```
1. Sur le dashboard, il devrait y avoir un diagnostic automatique
2. Vérifier tous les tests :
   - ✅ Configuration Supabase
   - ✅ Authentification
   - ✅ Accès à la table profiles
   - ✅ Comptage des administrateurs
   - ✅ Récupération avec filtre is_active
   - ✅ Récupération administrateurs complets
```

**Résultat attendu** : Tout doit être en ✅ (pas d'erreurs 400)

**Si erreur on voit "❌ ERREUR : error 400: ..." :**
- Vérifier la console navigateur (F12)
- Vérifier les colonnes mentionnées en réponse d'erreur
- Comparer avec le document schema

---

### 3️⃣ Affichage du tableau des administrateurs

**Test** :
```
1. Scanner le tableau des administrateurs
2. Colonnes visibles :
   ✅ Nom complet
   ✅ Email
   ✅ Rôle (badge coloré)
   ✅ Statut (Actif/Inactif)
   ✅ Date de création (format français)
   ✅ Actions (3 boutons)
```

**Résultat attendu** : 6 colonnes affichées correctement

---

### 4️⃣ Créer un nouvel administrateur (sans password)

**Test** :
```
1. Cliquer "Ajouter un administrateur"
2. Remplir :
   - Nom : "Test Admin"
   - Email : "test.admin@example.com"
   - Rôle : "Admin"
   - Mot de passe : (laisser vide)

3. Cliquer "Créer"
```

**Résultat attendu** :
- ✅ Message de succès : "Administrateur créé avec succès!"
- ✅ Admin apparaît dans le tableau
- ✅ is_active = true
- ✅ Date de création = aujourd'hui

**En coulisse** :
- Profil créé dans profiles table
- UUID généré aléatoirement
- Pas de création d'utilisateur Supabase Auth

---

### 5️⃣ Créer un nouvel administrateur (avec password)

**Test** :
```
1. Cliquer "Ajouter un administrateur"
2. Remplir :
   - Nom : "Password Admin"
   - Email : "password.admin@example.com"
   - Mot de passe : "TestPassword123!"
   - Rôle : "Admin Contenu"

3. Cliquer "Créer"
```

**Résultat attendu** :
- API appelle `/api/admins/create` au backend
- ✅ Utilisateur Supabase Auth créé avec email/password
- ✅ Profil créé dans profiles table
- ✅ Admin apparaît dans le tableau

**Si erreur** (backend non disponible) :
- 🔴 Message : "Error calling backend..."
- Continuer sans création Supabase Auth (juste profil)

---

### 6️⃣ Modifier un administrateur

**Test** :
```
1. Cliquer "Modifier" sur un admin
2. Changer :
   - Nom : "Admin Modifié"
   - Rôle : "Super Admin"

3. Cliquer "Mettre à jour"
```

**Résultat attendu** :
- ✅ Message de succès
- ✅ Tableau mis à jour immédiatement
- ✅ Nouveau nom et rôle affichés

**Formulaire fermé** : Après succès

---

### 7️⃣ Bloquer/Débloquer un administrateur

**Test - Bloquer** :
```
1. Trouver un admin avec statut "Actif" (vert)
2. Cliquer "Bloquer"
3. Statut change à "Inactif" (rouge)
```

**Test - Débloquer** :
```
1. Cliquer sur le bouton "Débloquer"
2. Statut change à "Actif" (vert)
```

**Résultat attendu** :
- ✅ Toggle immédiat de is_active
- ✅ Badge de couleur change
- ✅ Message de succès

---

### 8️⃣ Supprimer un administrateur

**Test** :
```
1. Cliquer "Supprimer" sur un admin
2. Fenêtre de confirmation apparaît
   "Êtes-vous sûr de vouloir supprimer cet administrateur ?"

3. Cliquer OK
```

**Résultat attendu** :
- ✅ Admin disparaît du tableau
- ✅ Message de succès
- ✅ Profil supprimé de Supabase

---

## 🔍 Tests de sécurité

### Test 1: Protection de la route

```bash
# Tenter d'accéder sans authentification
curl -i http://localhost:5173/superadmin/dashboard

# Résultat attendu : Redirection vers /superadmin/login
```

### Test 2: Rôle incorrect

```
1. Connecter un utilisateur 'admin' (pas 'superadmin')
2. Tenter d'accéder à /superadmin/dashboard
3. Devrait être redirigé

Résultat attendu : 🔒 Accès refusé
```

---

## 🧪 Tests des erreurs 400

### Vérifier les requêtes Supabase (F12 - Onglet Network)

**Les requêtes doivent contenir :**
- ✅ GET /rest/v1/profiles?select=id%2Cfull_name%2Cemail%2Crole%2Cis_active%2Ccreated_at%2Cupdated_at
- ✅ Filtre : select avec colonnes correctes
- ✅ Pas de colonnes non-existantes : `description`, `published_date`, `name`, `is_active` (dans users), etc.

### Si erreur 400 :
```
Chercher dans la réponse :
"column X does not exist"

Exemples d'erreurs à ÉVITER :
❌ "column profiles.name does not exist" → doit être full_name
❌ "column profiles.is_active does not exist" → doit exister
❌ "column users.email does not exist" → doit venir de profiles
```

---

## 📊 État attendu dans Supabase

### Table `profiles`

Après les tests, vous devez avoir :

```sql
-- Vérifier les administrateurs créés
SELECT id, full_name, email, role, is_active, created_at 
FROM profiles
WHERE role IN ('admin', 'admin_content', 'superadmin')
ORDER BY created_at DESC;
```

**Résultat attendu** :
- ✅ Tous les admins créés étape 4-5
- ✅ is_active = true/false selon les tests 7
- ✅ created_at = dates correctes

### Base de données Supabase Auth

```
Vérifier : Auth → Users
- Les utilisateurs créés à l'étape 5 (avec password) doivent être présents
- Status : email confirmed (ou active)
```

---

## 🐛 Débogage

### Console navigateur (F12)

Chercher les logs :
```javascript
// Succès
console.log('Admin créé:', { id, full_name, email, role })
console.log('Admin activé:', { id, is_active })

// Erreurs
console.error('Error creating admin:', error)
console.error('Error fetching admins:', error)
```

### Onglet Network (F12)

Vérifier les appels :
1. **GET /rest/v1/profiles** → 200 OK
2. **POST /rest/v1/profiles** (création) → 201 Created
3. **PATCH /rest/v1/profiles** (update) → 200 OK ou 204 No Content
4. **DELETE /rest/v1/profiles** → 204 No Content
5. **POST /api/admins/create** (avec password) → 201 Created

### Logs Supabase

Vérifier les logs Supabase :
```
https://app.supabase.com/project/[PROJECT_ID]/logs
```

---

## 📝 Checklist finale

- [ ] ✅ Accès sécurisé (superadmin only)
- [ ] ✅ Tableau affiche 6 colonnes correctes
- [ ] ✅ Diagnostic sans erreur 400
- [ ] ✅ Création sans password fonctionne
- [ ] ✅ Création avec password fonctionne
- [ ] ✅ Modification du nom/rôle fonctionne
- [ ] ✅ Blocage/déblocage fonctionne
- [ ] ✅ Suppression fonctionne
- [ ] ✅ Dates affichées au format français
- [ ] ✅ Messages de succès affichés
- [ ] ✅ Gestion d'erreurs correcte

---

## 🎉 Succès !

Si tous les tests passent, le SuperAdmin Dashboard est **OPÉRATIONNEL** ! 🚀
