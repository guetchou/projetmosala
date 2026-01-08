import os

FEATURES = [
    {
        "name": "AdvancedSearch",
        "route": "/advanced-search",
        "title": "Recherche avancée",
        "desc": "Mots-clés, filtres géographiques, résultats instantanés et suggestions dynamiques.",
    },
    {
        "name": "ProfileCreation",
        "route": "/profile-creation",
        "title": "Création de profil",
        "desc": "Ajoutez photo, vidéo, CV en ligne. Sauvegarde automatique et suggestions personnalisées.",
    },
    {
        "name": "InteractiveMap3D",
        "route": "/map-3d",
        "title": "Carte interactive 3D",
        "desc": "Zoom, clusters, Street View local, photos issues du projet Mosala.",
    },
    {
        "name": "CustomAlerts",
        "route": "/alerts",
        "title": "Alertes personnalisées",
        "desc": "Recevez des notifications par SMS, email ou in-app selon vos préférences.",
    },
    {
        "name": "RecruiterSpace",
        "route": "/recruiter-space",
        "title": "Espace recruteur",
        "desc": "Publiez des annonces, tri automatique des candidatures, chat intégré et statistiques avancées.",
    },
    {
        "name": "OfflineMode",
        "route": "/offline-mode",
        "title": "Mode hors-ligne",
        "desc": "Consultez les offres sans connexion et sauvegardez les dernières opportunités.",
    },
]

PAGE_DIR = "src/pages"
APP_PATH = "src/App.tsx"

PAGE_TEMPLATE = '''
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const {name} = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">{title}</h1>
      <p className="text-lg text-[#F5F5F7] mb-8 whitespace-pre-line">{desc}</p>
      {{/* Ici, ajoutez le composant ou la logique spécifique à la fonctionnalité */}}
    </main>
    <Footer />
  </div>
);

export default {name};
'''

def create_pages():
    os.makedirs(PAGE_DIR, exist_ok=True)
    for feature in FEATURES:
        path = os.path.join(PAGE_DIR, f"{feature['name']}.tsx")
        with open(path, "w", encoding="utf-8") as f:
            f.write(PAGE_TEMPLATE.format(**feature))
        print(f"Page créée : {path}")

def patch_routes():
    with open(APP_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    # Ajout des imports
    for feature in FEATURES:
        import_line = f"import {feature['name']} from './pages/{feature['name']}';"
        if import_line not in content:
            content = import_line + "\n" + content
    # Ajout des routes (pour React Router v6)
    if '<Routes>' in content:
        for feature in FEATURES:
            route_line = f'<Route path="{feature["route"]}" element={{<{feature["name"]} />}} />'
            if route_line not in content:
                # Ajoute avant </Routes>
                content = content.replace('</Routes>', f'  {route_line}\n</Routes>')
    with open(APP_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("Routes ajoutées dans App.tsx")

if __name__ == "__main__":
    create_pages()
    patch_routes() 