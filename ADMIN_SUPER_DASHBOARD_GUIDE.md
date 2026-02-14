# 📊 Guide du Super Admin Dashboard - Mosala

## Vue d'ensemble

Le Super Admin Dashboard est l'interface complète de gestion du système Mosala. Il permet de gérer dynamiquement :
- ✅ **Formations** - Créer, modifier, supprimer des formations
- ✅ **Actualités** - Gérer les news et les mettre en avant
- ✅ **Administrateurs** - Gérer les comptes d'administration

## 🚀 Accès

### URL
```
http://localhost:5173/superadmin/dashboard
```

### Authentification
- Email: `superadmin@mosala.com` (configuré via Supabase)
- Rôle: `superadmin`

## 📋 Fonctionnalités

### 1. 📚 Gestion des Formations

#### Créer une formation
1. Cliquez sur **"+ Ajouter une formation"**
2. Remplissez les champs :
   - **Titre** : Nom de la formation *
   - **Description** : Détails de la formation *
   - **Durée** : Ex: "12 mois"
   - **Domaine** : Ex: "Informatique"
3. Cliquez sur **"Créer"**

#### Modifier une formation
1. Cliquez sur **"Modifier"** sur la carte de la formation
2. Mettez à jour les informations
3. Cliquez sur **"Mettre à jour"**

#### Supprimer une formation
1. Cliquez sur **"Supprimer"** sur la carte
2. Confirmez la suppression

### 2. 📰 Gestion des Actualités

#### Créer une actualité
1. Cliquez sur **"+ Ajouter une actualité"**
2. Remplissez :
   - **Titre** : Titre de l'actualité *
   - **Extrait** : Résumé court *
   - **Contenu** : Texte complet (optionnel)
   - **Mettre à la une** : Cochez pour afficher en avant
3. Cliquez sur **"Créer"**

#### Mettre en avant/Retirer
- Cliquez sur **"★ À la une"** pour basculer le statut

#### Modifier une actualité
1. Cliquez sur **"Modifier"** sur la carte
2. Mettez à jour le contenu
3. Cliquez sur **"Mettre à jour"**

#### Supprimer une actualité
1. Cliquez sur **"Supprimer"**
2. Confirmez

### 3. 👥 Gestion des Administrateurs

#### Créer un administrateur
1. Cliquez sur **"+ Ajouter un administrateur"**
2. Remplissez :
   - **Nom** : Nom complet *
   - **Email** : Adresse email unique *
   - **Rôle** : Admin Contenu ou Admin
3. Cliquez sur **"Créer"**

#### Modifier un administrateur
1. Cliquez sur **"Modifier"** dans le tableau
2. Mettez à jour les informations
3. Cliquez sur **"Mettre à jour"**

#### Supprimer un administrateur
1. Cliquez sur **"Supprimer"** dans le tableau
2. Confirmez

#### Rôles disponibles
- **Admin Contenu** : Peut gérer les formations et actualités
- **Admin** : Accès complet à l'administration

## 📊 Tableau de Bord

Le tableau de bord affiche :
- 📈 **Statistiques** : Nombre total de formations, actualités, administrateurs
- 🌟 **Actualités en avant** : Nombre d'actualités mises à la une
- 🏆 **Formations par domaine** : Distribution des formations par domaine

### Auto-synchronisation
Les données se mettent à jour automatiquement toutes les 30 secondes.

## 💾 Intégration avec Supabase

### Tables utilisées
1. **formations_advanced**
   ```sql
   - id, title, description, content, duration, level, status, author_id, created_at, updated_at
   ```

2. **news**
   ```sql
   - id, title, description, content, is_featured, is_published, author_id, created_at, updated_at
   ```

3. **users**
   ```sql
   - id, name, email, password, role, is_active, created_at, updated_at
   ```

### Sécurité (Row Level Security)
- Seuls les administrateurs authentifiés peuvent accéder aux données
- Les utilisateurs ne peuvent voir que le contenu publié
- Les superadmins ont accès complet à toutes les opérations CRUD

## 🔄 Flux de travail recommandé

### 1. Créer une formation
```
Formation → Domaine → Durée → Publier
```

### 2. Créer une actualité
```
Nouvelle actualité → Contenu → Mettre à la une → Publier
```

### 3. Gérer les administrateurs
```
Ajouter admin → Assigner rôle → Vérifier permissions
```

## ⚡ Raccourcis clavier

- `Echap` : Fermer un formulaire
- `Enter` : Soumettre un formulaire (si prêt)

## 🐛 Dépannage

### Les données ne se mettent pas à jour
1. Vérifiez la connexion à Supabase
2. Rafraîchissez la page (F5)
3. Vérifiez les paramètres d'authentification

### Erreur lors de la création
- Assurez-vous que tous les champs requis sont remplis
- Vérifiez que l'email est unique pour les administrateurs
- Vérifiez votre connexion à la base de données

### Impossible de modifier/supprimer
- Vérifiez que vous avez les permissions suffisantes
- Essayez de vous reconnecter
- Videz le cache du navigateur

## 📝 Notes importantes

1. **Sauvegarde** : Tous les changements sont automatiquement sauvegardés dans Supabase
2. **Synchronisation** : Les modifications apparaissent immédiatement
3. **Validation** : Les champs requis sont marqués avec un `*`
4. **Messages** : Les succès et erreurs sont affichés en temps réel
5. **Annulation** : Vous pouvez annuler la création/édition en cliquant "Annuler"

## 🔐 Bonnes pratiques

1. ✅ Mettez à jour régulièrement les descriptions des formations
2. ✅ Mettez en avant les actualités les plus importantes
3. ✅ Vérifiez les permissions des administrateurs
4. ✅ Sauvegardez régulièrement vos données
5. ✅ Testez les modifications en mode développement d'abord

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

---

**Dernière mise à jour** : 11 février 2026
**Version** : 1.0.0
