# Système de Gestion des Actualités Mosala

## Vue d'ensemble

Le système de gestion des actualités (News) est maintenant complètement intégré au projet Mosala avec:
- **Backend**: API REST avec endpoints pour CRUD, publication, et gestion des actualités à la une
- **Frontend Admin**: Formulaire complet pour créer/modifier les actualités avec upload d'images
- **Frontend Public**: Page actualités publique et intégration sur l'accueil

## Architecture

### Base de Données

#### Entité News
```typescript
@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;  // Titre de l'actualité

  @Column('text')
  description: string;  // Description courte

  @Column('text')
  content: string;  // Contenu complet

  @Column({ nullable: true })
  imageUrl?: string;  // URL de l'image

  @Column({ nullable: true })
  link?: string;  // Lien vers l'article officiel

  @Column({ default: false })
  isPublished: boolean;  // Publié ou brouillon

  @Column({ default: false })
  isFeatured: boolean;  // À la une (une seule à la fois)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.news)
  author: User;
}
```

## API Endpoints

### Lecture (Public)
```
GET /news
  - Récupère toutes les actualités publiées
  - Paramètres: ?published=true (optionnel)
  
GET /news/:id
  - Récupère une actualité par ID
  
GET /news/featured/latest
  - Récupère l'actualité à la une
  
GET /news/latest/:limit
  - Récupère les N dernières actualités
  - Paramètres: limit (défaut: 3)
```

### Écriture (Admin seulement)
```
POST /news
  - Crée une nouvelle actualité
  - Authentification: Admin_Content, Superadmin
  - Payload:
    {
      "title": string,
      "description": string,
      "content": string,
      "imageUrl": string,
      "link": string (optionnel),
      "isPublished": boolean,
      "isFeatured": boolean
    }

PATCH /news/:id
  - Modifie une actualité
  - Mêmes permissions

DELETE /news/:id
  - Supprime une actualité
  - Mêmes permissions

PATCH /news/:id/publish
  - Publie une actualité
  
PATCH /news/:id/unpublish
  - Dépublie une actualité

PATCH /news/:id/set-featured
  - Met l'actualité à la une (retire l'ancienne)

PATCH /news/:id/unset-featured
  - Retire de la une
```

## Frontend - Composants

### NewsForm.tsx
**Localisation**: `frontend/src/components/NewsForm.tsx`

Formulaire complet pour créer et modifier les actualités:
- Upload d'image avec aperçu
- Champs texte: titre, description, contenu
- Champ URL: lien vers l'article officiel
- Checkboxes: publier maintenant, mettre à la une
- Validation côté client avec messages d'erreur
- Support de l'édition (pré-remplissage des données)

**Utilisation**:
```tsx
<NewsForm 
  onSuccess={(news) => console.log('Succès!', news)}
  editingNews={newsItem}  // optionnel pour l'édition
  onCancel={() => setEditing(false)}  // optionnel
/>
```

### NewsSection.tsx
**Localisation**: `frontend/src/components/NewsSection.tsx`

Section à intégrer sur la page d'accueil:
- **Actualité à la une**: Grande carte avec image, titre, description, boutons d'action
- **Dernières actualités**: Grille de 3 cartes récentes
- **Bouton**: Voir toutes les actualités

Récupère automatiquement les données depuis les API endpoints `/news/featured/latest` et `/news/latest/3`.

### Actualites.tsx
**Localisation**: `frontend/src/pages/Actualites.tsx`

Page publique complète pour afficher toutes les actualités:
- Affichage en grille responsif
- Pagination (6 articles par page)
- Filtre par statut de publication
- Indicateur "À la une" pour les articles vedettes
- Lien vers article officiel (si disponible)

### ActualiteDetail.tsx
**Localisation**: `frontend/src/pages/ActualiteDetail.tsx`

Page de détail d'une actualité:
- Affichage complet du contenu
- Image en en-tête
- Métadonnées (date, auteur)
- Lien "Lire l'article officiel" si disponible
- Navigation de retour

## Frontend - Pages Admin

### SuperAdminDashboard.tsx
**Section Actualités**:
- NewsForm pour créer des actualités
- Liste avec opérations:
  - Modifier
  - Publier/Dépublier
  - Mettre à la une/Retirer
  - Supprimer

### AdminContentDashboard.tsx
**Section Actualités**: Même fonctionnalité que SuperAdmin

## Frontend - Routes Ajoutées

```tsx
// Routes publiques
<Route path="/actualites" element={<Actualites />} />
<Route path="/actualites/:id" element={<ActualiteDetail />} />
```

## Frontend - Navigation

La navbar a été mise à jour pour inclure:
```
Accueil > Services > Formations > Actualités > Candidats > Emplois > À propos > Support
```

## Flux de Gestion des Actualités

### Création
1. Admin accède au dashboard
2. Clique sur "Gérer les actualités"
3. Remplit le formulaire NewsForm
4. Upload l'image
5. Ajoute titre, description, contenu
6. (Optionnel) Ajoute lien vers article officiel
7. Coche "Publier maintenant" pour publier immédiatement
8. Coche "Mettre à la une" si c'est une actualité importante
9. Clique "Créer"

### Mise à la une
- Une seule actualité peut être "à la une"
- Lors de la création/modification, si isFeatured=true:
  - L'ancienne actualité à la une est retirée
  - La nouvelle devient la vedette
- Affichage différencié sur l'accueil et la page des actualités

### Publication
- Les actualités peuvent être créées en brouillon
- Publier depuis la liste: bouton "📤 Publier"
- Visible au public une fois publiée

## Configuration Frontend

### API_BASE_URL
Assurez-vous que `frontend/src/config.ts` contient:
```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
```

### Authentification
NewsForm utilise le token JWT du contexte AuthContext.

## Styling

### Couleurs Mosala utilisées
- Vert: #2D8A5C (boutons primaires)
- Orange: #E67A00 (à la une, highlights)
- Gris: pour texte et arrière-plans secondaires

### Classes Tailwind personnalisées
- `mosala-green-600`: Bouton principal
- `mosala-orange-500`: Mise à la une
- `line-clamp-2`: Limitation texte sur 2 lignes
- `line-clamp-3`: Limitation texte sur 3 lignes

## Gestion des Images

### Frontend
- Upload via input file
- Conversion en base64 pour transmission à l'API
- Aperçu en temps réel

### Backend
- Les images sont stockées en tant que URL
- Possibilité d'intégration avec un service cloud (Cloudinary, AWS S3, etc.)
- Pour MVP: accepte les URLs externes et les data URLs base64

## Sécurité

### Authentification
- Endpoints d'écriture nécessitent un JWT valide
- Roles autorisés:
  - `admin_content`: Peut créer, modifier, publier ses propres actualités
  - `superadmin`: Peut tout gérer

### Authorization
- Les guards RolesGuard et JwtAuthGuard protègent les endpoints

### Validation
- Validation côté client avec class-validator (DTOs)
- Validation côté backend avec TypeORM

## Tests

### Test manuel - Créer une actualité
```bash
curl -X POST http://localhost:3000/api/news \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Test Actualité",
    "description": "Desc courte",
    "content": "Contenu complet",
    "imageUrl": "https://example.com/image.jpg",
    "link": "https://example.com/article",
    "isPublished": true,
    "isFeatured": false
  }'
```

### Test - Récupérer l'actualité à la une
```bash
curl http://localhost:3000/api/news/featured/latest
```

### Test - Récupérer les 3 dernières
```bash
curl http://localhost:3000/api/news/latest/3
```

## Améliorations Futures

1. **Upload Fichier Cloud**: Intégrer Cloudinary ou AWS S3
2. **Catégories**: Ajouter un système de catégorisation
3. **Tags**: Système d'étiquetage des articles
4. **Commentaires**: Permettre les commentaires validés
5. **Recherche**: Moteur de recherche dans les actualités
6. **Analytics**: Tracking des vues et engagements
7. **Scheduling**: Programmer la publication à une date future
8. **Drafts collaboratifs**: Plusieurs admins sur un brouillon

## Dépannage

### L'image ne s'affiche pas
- Vérifier que l'URL est valide
- Pour base64: vérifier que la conversion est complète
- Vérifier CORS si image externe

### "Actualité à la une" ne change pas
- Vérifier que `isFeatured` est bien à true
- Vérifier les permissions du rôle
- Recharger la page après modification

### Images larges ralentissent le formulaire
- Implémenter une compression côté client avant upload
- Utiliser un service cloud de transformation d'images

## Maintenance

### Migration Base de Données
Exécutée via `backend/db/001_init_admin_system.sql`:
```sql
-- Colonnes ajoutées à la table news
ALTER TABLE news ADD COLUMN link VARCHAR(255);
ALTER TABLE news ADD COLUMN "isFeatured" BOOLEAN DEFAULT FALSE;
```

### Nettoyage
- Articles non publiés peuvent s'accumuler
- Implémenter une politique d'archivage
- Backups réguliers recommandés

## Performance

- Images: Considérer la compression pour les grandes résolutions
- Pagination: 6 articles par page pour Actualites.tsx
- Cache: Envisager du cache côté client pour la page d'accueil
- Lazy loading: Implémenter pour les images avec react-lazy-load-image-component

## Conformité

- RGPD: Les données d'auteur sont minimales (email, firstName, lastName)
- Accessibilité: Alt text sur images, contraste approprié
- SEO: Titres H1-H3 structurés, meta tags dynamiques recommandés
