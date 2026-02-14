# 🔧 GUIDE DE CORRECTION - Problème de Connexion Admin

## 📊 État Actuel

### ✅ Éléments Opérationnels
- `@supabase/supabase-js` v2.95.3 ✅ Installé
- `VITE_SUPABASE_URL` ✅ Configuré
- `VITE_SUPABASE_ANON_KEY` ✅ Configuré
- `VITE_API_URL` ✅ **CORRIGÉ** (ajouté: http://localhost:3000)

### ❌ Éléments à Vérifier
1. Backend NestJS en écoute sur port 3000
2. Tables Supabase créées
3. Utilisateur admin créé en base de données

---

## 🚀 Étapes de Correction

### Étape 1: Vérifier le Backend NestJS
```bash
# Terminal 1: Aller au backend
cd /Users/francklinetoka/Documents/GitHub/projetmosala/backend

# Vérifier les dépendances
npm list | grep -E "nest|express|typescript"

# Démarrer le backend
npm run start
```

**Attendre le message**: `[Nest] Application listening on port 3000`

---

### Étape 2: Vérifier la Configuration Supabase
```bash
# Terminal 2: Tester Supabase
cd /Users/francklinetoka/Documents/GitHub/projetmosala/frontend
node test-supabase.js
```

**Résultat attendu**:
```
✅ Client Supabase créé
✅ Table "users" accessible
✅ 1 administrateur(s) trouvé(s):
   - admin@mosala.com (superadmin)
```

---

### Étape 3: Tester l'API Backend
```bash
# Terminal 3: Tester l'API
bash /Users/francklinetoka/Documents/GitHub/projetmosala/test-api-backend.sh
```

**Résultat attendu**:
```
✅ Backend accessible
✅ Connexion réussie!
```

---

### Étape 4: Redémarrer le Frontend
```bash
# Terminal 4: Frontend
cd /Users/francklinetoka/Documents/GitHub/projetmosala/frontend

# Arrêter si déjà en cours (Ctrl+C)
# Redémarrer
npm run dev
```

**Attendre le message**: `VITE v... ready in ... ms`

---

### Étape 5: Tester la Connexion
1. Ouvrir le navigateur: http://localhost:5173
2. Cliquer sur "Connexion Admin" ou aller à `/superadmin/login`
3. Entrer les credentials:
   - **Email**: admin@mosala.com
   - **Mot de passe**: (celui défini)
4. Cliquer sur "Se connecter"

**Résultat attendu**: Redirection vers `/superadmin/dashboard`

---

## 🆘 Dépannage

### ❌ Erreur: "Impossible de joindre le backend"
```bash
# Vérifier si le backend écoute sur le port 3000
lsof -i :3000

# Si rien n'écoute, redémarrer le backend
cd backend && npm run start
```

### ❌ Erreur: "Table users introuvable"
```bash
# Vous devez exécuter les migrations Supabase
# 1. Ouvrir: https://app.supabase.com
# 2. Aller à: SQL Editor
# 3. Copier le contenu de: SUPABASE_MIGRATION.sql
# 4. Exécuter dans Supabase
```

### ❌ Erreur: "Utilisateur non trouvé"
```bash
# Créer un utilisateur admin via Supabase
# 1. Allez sur: https://app.supabase.com
# 2. Aller à: Database > Users
# 3. Insérer:
INSERT INTO users (email, password_hash, role, is_active) VALUES
('admin@mosala.com', crypt('password123', gen_salt('bf')), 'superadmin', true);
```

### ❌ Erreur: "CORS ou connexion refusée"
```bash
# Vérifier le fichier .env du frontend
cat /Users/francklinetoka/Documents/GitHub/projetmosala/frontend/.env

# Doit contenir:
# VITE_API_URL=http://localhost:3000

# Si manquant, redémarrer le frontend après correction
npm run dev
```

---

## 📋 Checklist Complète

### Configuration (✅ Fait)
- [x] `VITE_API_URL` configuré dans `frontend/.env`
- [x] `@supabase/supabase-js` installé

### À Vérifier
- [ ] Backend NestJS démarre sans erreur
- [ ] Port 3000 accessible
- [ ] Supabase fonctionne (test-supabase.js réussi)
- [ ] Tables créées en Supabase
- [ ] Utilisateur admin existe

### À Tester
- [ ] `npm run dev` redémarré après correction .env
- [ ] Page `/superadmin/login` charge correctement
- [ ] Connexion avec credentials admin réussit
- [ ] Token JWT reçu et stocké
- [ ] Redirection vers dashboard fonctionne

---

## 📞 Résumé Rapide

| Composant | Statut | Action |
|-----------|--------|--------|
| Frontend `.env` | ✅ Corrigé | Aucune |
| @supabase/supabase-js | ✅ Installé | Aucune |
| VITE_API_URL | ✅ Configuré | Redémarrer frontend |
| Backend NestJS | ⏳ À vérifier | Démarrer et tester |
| Supabase DB | ⏳ À vérifier | Tester avec script |
| Utilisateur Admin | ⏳ À vérifier | Créer si absent |

---

## 🎯 Prochaines Étapes

1. **Immédiatement**: Redémarrer le frontend (npm run dev)
2. **Puis**: Vérifier que le backend tourne
3. **Ensuite**: Exécuter les tests (test-supabase.js et test-api-backend.sh)
4. **Finalement**: Tester la connexion dans le navigateur

**Temps estimé**: 5-10 minutes

