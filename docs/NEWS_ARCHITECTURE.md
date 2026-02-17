# 🌐 Architecture Système d'Actualités Mosala

## Vue d'Ensemble Global

```
┌─────────────────────────────────────────────────────────────────┐
│                     MOSALA - SYSTÈME D'ACTUALITÉS               │
└─────────────────────────────────────────────────────────────────┘

                      COUCHE PRÉSENTATION
                           FRONTEND
        ┌───────────────────────────────────────────────────┐
        │                                                   │
    ┌───────────────────┐   ┌─────────────────┐   ┌─────────────────┐
    │    PAGES          │   │   COMPOSANTS    │   │   DASHBOARDS    │
    │                   │   │                 │   │   ADMIN         │
    ├───────────────────┤   ├─────────────────┤   ├─────────────────┤
    │ • Actualites.tsx  │   │ • NewsForm      │   │ • SuperAdmin    │
    │ • Actualite.Detail│   │ • NewsSection   │   │ • AdminContent  │
    │                   │   │ • Navbar        │   │                 │
    └───────────────────┘   └─────────────────┘   └─────────────────┘
        │                           │                       │
        │                           │                       │
        └───────────────┬───────────┴───────────────────────┘
                        │
                   API REST + JWT
                        │
        ┌───────────────────────────────────────────────────┐
        │                                                   │
        │              COUCHE API (NestJS)                 │
        │                                                   │
        ├───────────────────────────────────────────────────┤
        │                                                   │
    ┌────────────────┐   ┌────────────────┐   ┌──────────────────┐
    │  CONTROLLER    │   │    SERVICE     │   │    ENTITY        │
    ├────────────────┤   ├────────────────┤   ├──────────────────┤
    │ • Routes       │   │ • create()     │   │ • id             │
    │ • Validation   │   │ • findAll()    │   │ • title          │
    │ • Auth/Roles   │   │ • findOne()    │   │ • description    │
    │ • HTTP Codes   │   │ • update()     │   │ • content        │
    │                │   │ • remove()     │   │ • imageUrl       │
    │ 11 Endpoints   │   │ • publish()    │   │ • link ⭐        │
    │                │   │ • getFeatured()│   │ • isPublished    │
    │                │   │ • getLatest()  │   │ • isFeatured ⭐  │
    │                │   │ • setFeatured()│   │ • author (FK)    │
    │                │   │ • unsetFeatured│   │ • timestamps     │
    │                │   │                │   │                  │
    └────────────────┘   └────────────────┘   └──────────────────┘
        │                       │                       │
        └───────────────────────┼───────────────────────┘
                                │
                    TypeORM Entities & Repositories
                                │
        ┌───────────────────────────────────────────────────┐
        │                                                   │
        │           COUCHE DONNÉES (PostgreSQL)            │
        │                                                   │
        ├───────────────────────────────────────────────────┤
        │                                                   │
        │              TABLE: news                         │
        │  ┌─────────────────────────────────────────────┐ │
        │  │ id (PK)          | SERIAL                  │ │
        │  │ title            | VARCHAR(200)            │ │
        │  │ description      | TEXT                    │ │
        │  │ content          | TEXT                    │ │
        │  │ image_url        | VARCHAR(500)            │ │
        │  │ link ⭐          | VARCHAR(500)            │ │
        │  │ is_published     | BOOLEAN (DEFAULT: true) │ │
        │  │ is_featured ⭐   | BOOLEAN (DEFAULT: false)│ │
        │  │ category         | VARCHAR(50)             │ │
        │  │ author_id (FK)   | INTEGER                 │ │
        │  │ created_at       | TIMESTAMP               │ │
        │  │ updated_at       | TIMESTAMP               │ │
        │  └─────────────────────────────────────────────┘ │
        │                                                   │
        │  Indexes:                                         │
        │  • idx_news_published                             │
        │  • idx_news_author                                │
        │  • idx_news_featured                              │
        │                                                   │
        │  Security: RLS Enabled                            │
        │                                                   │
        └───────────────────────────────────────────────────┘
```

---

## Flux de Données - Créer une Actualité

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUX: CRÉER ACTUALITÉ                        │
└─────────────────────────────────────────────────────────────────┘

   ADMIN (Frontend)           API (Backend)           Base de Données
        │                            │                       │
        │ 1. Remplit NewsForm        │                       │
        ├─────────────────────────────>                       │
        │                            │                       │
        │ 2. Upload image            │                       │
        │    (base64 ou URL)         │                       │
        │                            │                       │
        │ 3. POST /api/news          │                       │
        │    + JWT Token             │                       │
        │                            │                       │
        │ 4. Validation              │                       │
        │    (DTOs)                  │                       │
        │                            │                       │
        │ 5. NewsService.create()    │                       │
        │    + Check isFeatured      │                       │
        │                            │ INSERT INTO news │
        │                            ├──────────────────────>
        │                            │                       │
        │                            │ (Si isFeatured=true)  │
        │                            │ UPDATE news SET       │
        │                            │ isFeatured=false      │
        │                            ├──────────────────────>
        │                            │                       │
        │                            │ RETURN id             │
        │<──────────────────────────────────────────────────
        │                            │                       │
        │ 6. Succès                  │                       │
        │    Refresh List            │                       │
        │                            │                       │
```

---

## Flux de Données - Afficher sur Accueil

```
┌─────────────────────────────────────────────────────────────────┐
│               FLUX: AFFICHER SUR PAGE D'ACCUEIL                  │
└─────────────────────────────────────────────────────────────────┘

   VISITEUR (Frontend)        API (Backend)           Base de Données
        │                            │                       │
        │ 1. Accueil page load       │                       │
        │                            │                       │
        │ 2. <NewsSection /> render  │                       │
        │                            │                       │
        │ 3. GET /api/news/featured/latest                   │
        ├─────────────────────────────>                       │
        │                            │ SELECT * FROM news    │
        │                            │ WHERE isFeatured=true │
        │                            ├──────────────────────>
        │                            │ AND isPublished=true  │
        │                            │ LIMIT 1               │
        │                            │<─────────────────────
        │<───────────────────────────────────────────────────
        │ Featured Article (JSON)    │                       │
        │                            │                       │
        │ 4. GET /api/news/latest/3  │                       │
        ├─────────────────────────────>                       │
        │                            │ SELECT * FROM news    │
        │                            │ WHERE isPublished=true│
        │                            ├──────────────────────>
        │                            │ ORDER BY createdAt    │
        │                            │ DESC LIMIT 3          │
        │                            │<─────────────────────
        │<───────────────────────────────────────────────────
        │ 3 Recent Articles (JSON)   │                       │
        │                            │                       │
        │ 5. Render UI               │                       │
        │    • Featured card         │                       │
        │    • 3x Recent cards       │                       │
        │    • "Voir toutes" button  │                       │
        │                            │                       │
        │ 6. Click article           │                       │
        │ 7. Navigation →            │                       │
        │    /actualites/:id         │                       │
        │                            │                       │
```

---

## Permissions & Sécurité

```
┌─────────────────────────────────────────────────────────────────┐
│                     MATRICE DE PERMISSIONS                      │
└─────────────────────────────────────────────────────────────────┘

                    │ Public │ Admin │ Superadmin │
────────────────────┼────────┼───────┼────────────┤
GET /news           │   ✅   │  ✅   │     ✅     │
GET /news/:id       │   ✅   │  ✅   │     ✅     │
GET /featured       │   ✅   │  ✅   │     ✅     │
GET /latest/:limit  │   ✅   │  ✅   │     ✅     │
────────────────────┼────────┼───────┼────────────┤
POST /news          │   ❌   │  ✅   │     ✅     │
PATCH /news/:id     │   ❌   │  ✅   │     ✅     │
DELETE /news/:id    │   ❌   │  ✅   │     ✅     │
PATCH /publish      │   ❌   │  ✅   │     ✅     │
PATCH /unpublish    │   ❌   │  ✅   │     ✅     │
PATCH /set-featured │   ❌   │  ✅   │     ✅     │
PATCH /unset-feat   │   ❌   │  ✅   │     ✅     │
────────────────────┼────────┼───────┼────────────┤

Note: 
- Admin = admin_content role
- Superadmin = superadmin role
- Public = No authentication required
- ✅ = Allowed
- ❌ = Denied
```

---

## Gestion de la Vedette (isFeatured)

```
┌─────────────────────────────────────────────────────────────────┐
│              LOGIQUE: MISE À LA UNE                              │
└─────────────────────────────────────────────────────────────────┘

Scénario: Admin veut mettre Article B à la une
(Article A est actuellement à la une)

┌─────────────────────────────────────────────────────────────────┐
│ Article A (isFeatured: true)                                    │
│ Article B (isFeatured: false)  ← Admin choisit cet article     │
│ Article C (isFeatured: false)                                   │
└─────────────────────────────────────────────────────────────────┘

       Admin clicks "Mettre à la une" on Article B
                          ↓
       Backend: setFeatured(B.id)
                          ↓
       Step 1: UPDATE news SET isFeatured=false 
               WHERE isFeatured=true
               (Article A devient non-vedette)
                          ↓
       Step 2: UPDATE news SET isFeatured=true 
               WHERE id=B.id
               (Article B devient vedette)
                          ↓
┌─────────────────────────────────────────────────────────────────┐
│ Article A (isFeatured: false)  ← Automatically changed!         │
│ Article B (isFeatured: true)   ← Now featured!                 │
│ Article C (isFeatured: false)                                   │
└─────────────────────────────────────────────────────────────────┘

Avantage: Une seule vedette garantie!
```

---

## Composants Frontend - Relations

```
┌─────────────────────────────────────────────────────────────────┐
│                 ARBRE DE COMPOSANTS                              │
└─────────────────────────────────────────────────────────────────┘

App (Router)
│
├─ Accueil
│  │
│  ├─ Navbar (lien "Actualités")
│  │
│  ├─ Hero
│  │
│  ├─ TrustSection
│  │
│  ├─ FeaturesSection
│  │
│  └─ NewsSection ⭐
│     ├─ Vedette Card
│     │  └─ Image + Title + Desc + Buttons
│     │
│     └─ 3x Recent Cards (Grid)
│        └─ Image + Title + Desc + Buttons
│
├─ /actualites
│  │
│  └─ Actualites ⭐
│     ├─ Header Section
│     │
│     ├─ Grid of Articles (6/page)
│     │  └─ Article Cards
│     │     └─ Image + Title + Desc + Buttons
│     │
│     └─ Pagination
│
├─ /actualites/:id
│  │
│  └─ ActualiteDetail ⭐
│     ├─ Header Image
│     │
│     ├─ Title + Meta
│     │
│     ├─ Content
│     │
│     └─ Official Link Button
│
└─ Admin Dashboards
   │
   ├─ SuperAdminDashboard
   │  │
   │  └─ News Section
   │     ├─ NewsForm ⭐
   │     │  └─ Form Inputs + Upload + Checkboxes
   │     │
   │     └─ News List
   │        └─ Action Buttons
   │
   └─ AdminContentDashboard
      │
      └─ News Section (Même que SuperAdmin)
```

---

## Endpoints API - Résumé

```
┌─────────────────────────────────────────────────────────────────┐
│                    API ENDPOINTS                                │
└─────────────────────────────────────────────────────────────────┘

PUBLIC (Lecture)
────────────────────────────────────────────────────────────────
GET    /api/news
       Retourne: Array<News>
       Params: ?published=true (optionnel)

GET    /api/news/:id
       Retourne: News
       Params: id (number)

GET    /api/news/featured/latest
       Retourne: News | null
       Notes: Actualité à la une

GET    /api/news/latest/:limit
       Retourne: Array<News>
       Params: limit (default: 3)

────────────────────────────────────────────────────────────────

PRIVÉ (Écriture - Admin)
────────────────────────────────────────────────────────────────
POST   /api/news
       Auth: Bearer JWT + Role: admin_content|superadmin
       Body: CreateNewsDto
       Retourne: News

PATCH  /api/news/:id
       Auth: Bearer JWT + Role: admin_content|superadmin
       Body: Partial<CreateNewsDto>
       Retourne: News
       Notes: Gère isFeatured logic

DELETE /api/news/:id
       Auth: Bearer JWT + Role: admin_content|superadmin
       Retourne: { message: string }

PATCH  /api/news/:id/publish
       Auth: Bearer JWT + Role: admin_content|superadmin
       Retourne: News

PATCH  /api/news/:id/unpublish
       Auth: Bearer JWT + Role: admin_content|superadmin
       Retourne: News

PATCH  /api/news/:id/set-featured
       Auth: Bearer JWT + Role: admin_content|superadmin
       Retourne: News
       Notes: Retire autre vedette auto

PATCH  /api/news/:id/unset-featured
       Auth: Bearer JWT + Role: admin_content|superadmin
       Retourne: News

────────────────────────────────────────────────────────────────

Authentification:
- Format: Authorization: Bearer <JWT_TOKEN>
- JWT TTL: 7 days
- Roles: admin_content, superadmin

Erreurs Courantes:
- 400: Validation échouée
- 401: Non authentifié
- 403: Non autorisé (rôle)
- 404: Ressource non trouvée
- 500: Erreur serveur
```

---

## Déploiement - Points Clés

```
┌─────────────────────────────────────────────────────────────────┐
│                    CHECKLIST DÉPLOIEMENT                        │
└─────────────────────────────────────────────────────────────────┘

AVANT DÉPLOIEMENT:
────────────────────────────────────────────────────────────────
☐ Tester tous les endpoints (script test-news-api.sh)
☐ Vérifier permissions rôles
☐ Tester upload images
☐ Tester pagination
☐ Vérifier responsive design
☐ Tests base de données
☐ Vérifier variables d'environnement

DATABASE:
────────────────────────────────────────────────────────────────
☐ Exécuter migration SQL (001_init_admin_system.sql)
☐ Vérifier indexes créés
☐ Vérifier RLS activé
☐ Backup pré-déploiement

BACKEND:
────────────────────────────────────────────────────────────────
☐ Variables d'environnement configurées
☐ JWT_SECRET changé (production)
☐ CORS configuré
☐ Logs configurés
☐ Monitoring en place

FRONTEND:
────────────────────────────────────────────────────────────────
☐ VITE_API_URL correcte
☐ Compression images activée
☐ Cache headers configurés
☐ SEO meta tags ajoutés
☐ Erreurs 404 gérées

TESTS POST-DÉPLOIEMENT:
────────────────────────────────────────────────────────────────
☐ Créer actualité en admin
☐ Vérifier visible sur accueil
☐ Vérifier page actualités
☐ Vérifier détail article
☐ Tester lien officiel
☐ Tester vedette
☐ Performance: Lighthouse
```

---

## Points de Performance

```
┌─────────────────────────────────────────────────────────────────┐
│                      OPTIMISATIONS                              │
└─────────────────────────────────────────────────────────────────┘

BACKEND:
────────────────────────────────────────────────────────────────
✅ Index BD sur: published, featured, author
✅ Pagination simple (6 articles)
✅ Select spécifique (pas *) si nécessaire
✅ Lazy load relations si besoin

FRONTEND:
────────────────────────────────────────────────────────────────
✅ Image lazy loading recommandé
✅ Pagination au lieu de infinite scroll
✅ Cache locale si API instable
✅ Compression images côté client optionnelle

IMAGES:
────────────────────────────────────────────────────────────────
✅ Format recommandé: WebP, JPG
✅ Max width: 1200px
✅ Max size: 2MB
✅ Cloudinary/AWS S3 pour production
```

---

**Architecture Version**: 1.0
**Statut**: Production Ready ✅
**Dernière Mise à Jour**: 2024-2025
