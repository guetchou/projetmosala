# Guide Rapide - Gestion des Actualités

## Pour les Administrateurs

### Créer une nouvelle actualité

1. **Connectez-vous** au dashboard admin
   - Superadmin: `/superadmin/login`
   - Admin Contenu: `/admin-content/login`

2. **Accédez à "Gérer les actualités"** (📰 dans la barre latérale)

3. **Remplissez le formulaire**:
   - 📷 **Image**: Cliquez pour choisir une image
   - 📝 **Titre**: Titre principal de l'actualité
   - 📄 **Description**: Résumé court (visible dans les listes)
   - ✍️ **Contenu**: Texte complet de l'actualité
   - 🔗 **Lien officiel**: URL vers l'article complet (optionnel)
   - ☑️ **Publier maintenant**: Rendre visible immédiatement
   - ⭐ **Mettre à la une**: Affiche en vedette (une seule possible)

4. **Cliquez "Créer"** ou **"Mettre à jour"** si vous modifiez

### Modifier une actualité

1. Dans le tableau des actualités, cliquez **✏️ Modifier**
2. Modifiez les champs souhaités
3. Cliquez **"Mettre à jour"**

### Publier / Dépublier

- Cliquez **📤 Publier** sur une actualité en brouillon
- Pour dépublier: utilisez l'API ou éditez et décochez "Publier"

### Supprimer

- Cliquez **🗑️ Supprimer** (confirmez)

### Mettre / Retirer de la une

**Lors de la création/édition**:
- Cochez **"Mettre à la une"** pour en faire la vedette
- L'ancienne actualité à la une sera automatiquement retirée

## Pour les Visiteurs

### Voir les actualités

1. **Sur l'accueil** (`/`)
   - **Actualité vedette**: Grande carte avec image et contenu
   - **3 dernières actualités**: En bas de la section
   - Cliquez **"Voir toutes les actualités"** pour plus

2. **Page complète** (`/actualites`)
   - Grille de toutes les actualités
   - Pagination (6 par page)
   - Cliquez **"Lire la suite"** pour le détail

3. **Page de détail** (`/actualites/:id`)
   - Contenu complet
   - Image en en-tête
   - Lien vers article officiel (si disponible)

## Bonnes Pratiques

### Images
- ✅ Format: JPG, PNG, WebP
- ✅ Taille: 1200x600px idéal
- ✅ Poids: < 2MB pour rapidité
- ✅ Qualité: Haute résolution recommandée

### Texte
- ✅ **Titre**: 50-80 caractères
- ✅ **Description**: 150-250 caractères
- ✅ **Contenu**: Structures avec paragraphes
- ✅ Évitez les blocages: Ne pas mettre tout en majuscules

### À la une
- ⭐ Une seule actualité à la fois
- ⭐ Réservé aux articles importants
- ⭐ À mettre à jour régulièrement

### Publication
- 📅 Publiez régulièrement (au moins 2x par semaine)
- 📅 Planifiez à l'avance avec les brouillons
- 📅 Archivez les anciennes (au-delà de 3 mois)

## Cas d'usage courants

### 1️⃣ Créer un article en brouillon
- Décochez "Publier maintenant"
- Cliquez "Créer"
- Modifiez plus tard si nécessaire

### 2️⃣ Publier rapidement après brouillon
- Dans la liste, cliquez "📤 Publier"
- Aucune modification requise

### 3️⃣ Changer la vedette
- Éditez la nouvelle actualité
- Cochez "Mettre à la une"
- L'ancienne est automatiquement retirée

### 4️⃣ Ajouter un lien externe
- Remplissez le champ "Lien officiel"
- Un bouton 📄 apparaîtra pour les visiteurs
- Les deux se lancent dans des onglets séparés

### 5️⃣ Supprimer une actualité
- ⚠️ Définitif - pas d'annulation
- Cliquez "🗑️ Supprimer"
- Confirmez

## Dépannage

### L'image n'apparaît pas
- Vérifiez le lien/l'upload
- Rechargez la page (cache)
- Vérifiez le format (JPG/PNG)

### Les modifications ne s'affichent pas
- Attendez quelques secondes
- Rechargez la page (Ctrl+F5)
- Vérifiez vos permissions d'admin

### "Mettre à la une" ne fonctionne pas
- Vérifiez que vous publiez simultanément
- Vérifiez votre rôle (Admin_Content ou Superadmin)
- Recharger la page après modification

### Erreur d'authentification
- Reconnectez-vous
- Vérifiez le token JWT
- Nettoyez le cache du navigateur

## Navigation

```
Accueil
├─ Actualités (section avec vedette + 3 récentes)
│  └─ Voir toutes → /actualites
│     ├─ Détail article 1 → /actualites/1
│     ├─ Détail article 2 → /actualites/2
│     └─ ...
└─ Footer (lien Actualités)

Dashboard Admin
├─ Tableau de bord
├─ Gérer les admins
├─ Gérer les actualités ← [VOTRE SECTION]
│  ├─ Ajouter une actualité (formulaire)
│  └─ Liste avec actions
└─ Gérer les formations
```

## Endpoints Utiles (pour API)

### Si vous testez avec des outils comme Postman/cURL:

**Créer une actualité**:
```bash
POST /api/news
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "title": "Mon Actualité",
  "description": "Description courte",
  "content": "Contenu complet",
  "imageUrl": "https://...",
  "link": "https://article.com",
  "isPublished": true,
  "isFeatured": false
}
```

**Mettre à la une**:
```bash
PATCH /api/news/1/set-featured
Authorization: Bearer YOUR_TOKEN
```

**Récupérer vedette + 3 récentes** (Public):
```bash
GET /api/news/featured/latest
GET /api/news/latest/3
```

## Support

- 📧 **Problème technique**: Contactez l'équipe dev
- 📞 **Question d'utilisation**: Consultez ce guide
- 🐛 **Bug découvert**: Rapportez avec détails
- 💡 **Suggestion**: Suggérez une amélioration

---

**Dernière mise à jour**: 2024-2025
**Version**: 1.0 - Système complet
**Statut**: Opérationnel ✅
