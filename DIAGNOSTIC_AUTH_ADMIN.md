# 🔍 Diagnostic - Problème de Connexion Admin

## 📋 Résumé des Problèmes Détectés

### ❌ 1. **VITE_API_URL MANQUANT**
- **Fichier**: `frontend/.env`
- **Problème**: La variable `VITE_API_URL` n'est **PAS définie**
- **Impact**: Les appels API pour la connexion admin échouent car l'URL de l'API est `undefined`
- **Preuve**: 
  ```
  AuthContext.tsx ligne 47:
  const response = await fetch(`${import.meta.env.VITE_API_URL}/mosala-api/auth/${endpoint}`, {
  
  Si VITE_API_URL est undefined, l'URL devient: "undefined/mosala-api/auth/superadmin/login"
  ```

### ✅ 2. **Supabase Configuration**
- **Clés présentes**: OUI
  - `VITE_SUPABASE_URL` ✅
  - `VITE_SUPABASE_ANON_KEY` ✅
- **Installation**: `@supabase/supabase-js` installé ✅

### ⚠️ 3. **Structure d'Authentification**
- **AuthContext.tsx**: Configuré correctement ✅
- **Endpoint utilisé**: `/mosala-api/auth/superadmin/login`
- **Dépend de**: Backend NestJS fonctionnel

---

## 🔧 SOLUTIONS REQUISES

### **Solution 1: Ajouter VITE_API_URL au frontend/.env**

```bash
# Frontend configuration
VITE_SUPABASE_URL=https://ikugkkubbyoohfpqcoum.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlrdWdra3ViYnlvb2hmcHFjb3VtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NDI3MTUsImV4cCI6MjA4NjIxODcxNX0.VibPKlcZpsAGSx756xja3TUfAtWFwq8phENXE9RTIe

# MANQUANT - À AJOUTER:
VITE_API_URL=http://localhost:3000
```

### **Solution 2: Vérifier le backend**

Doit être en écoute sur:
- **Port**: 3000 (configuré dans l'URL ci-dessus)
- **Route**: `/mosala-api/auth/superadmin/login`
- **Méthode**: POST

### **Solution 3: Vérifier Supabase**

Besoin de vérifier:
```
1. Connexion à Supabase fonctionne
2. Tables d'authentification créées (via SUPABASE_MIGRATION.sql)
3. Utilisateur admin existe en base
```

---

## ✅ Étapes de Correction

### Étape 1: Configurer VITE_API_URL
```bash
cd /Users/francklinetoka/Documents/GitHub/projetmosala/frontend
echo "" >> .env
echo "# Backend API" >> .env
echo "VITE_API_URL=http://localhost:3000" >> .env
```

### Étape 2: Redémarrer le frontend
```bash
cd /Users/francklinetoka/Documents/GitHub/projetmosala/frontend
npm run dev
```

### Étape 3: Vérifier le backend
```bash
cd /Users/francklinetoka/Documents/GitHub/projetmosala/backend
npm run start
```

### Étape 4: Tester la connexion
1. Ouvrir `http://localhost:5173/superadmin/login`
2. Utiliser les credentials admin
3. Vérifier les logs pour les erreurs

---

## 🧪 Commandes de Test

### Test Supabase
```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://ikugkkubbyoohfpqcoum.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
)

const { data, error } = await supabase.from('users').select('*')
console.log(data, error)
```

### Test API Backend
```bash
curl -X POST http://localhost:3000/mosala-api/auth/superadmin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@mosala.com","password":"password"}'
```

---

## 📝 Checklist de Vérification

- [ ] `VITE_API_URL` ajouté au `frontend/.env`
- [ ] Backend NestJS en écoute sur port 3000
- [ ] Supabase connecté et accessible
- [ ] Tables d'authentification créées
- [ ] Utilisateur admin existe en base de données
- [ ] Frontend redémarré après modification `.env`
- [ ] Test de connexion réussi

