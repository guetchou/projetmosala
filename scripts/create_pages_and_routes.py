import os

PAGES = [
    {
        "name": "Jobs",
        "route": "/jobs",
        "title": "Trouver un emploi",
        "desc": "Découvrez les meilleures offres d'emploi et formations adaptées à votre profil.",
    },
    {
        "name": "Employers",
        "route": "/employers",
        "title": "Recruter des talents",
        "desc": "Accédez à une base de candidats qualifiés et facilitez vos recrutements.",
    },
    {
        "name": "Candidates",
        "route": "/candidates",
        "title": "Annuaire des candidats",
        "desc": "Trouvez des profils variés et compétents pour tous vos besoins.",
    },
    {
        "name": "About",
        "route": "/about",
        "title": "À propos de Mosala",
        "desc": "Inclusion : Un site optimisé pour les connexions faibles et mobile-first\n\nInnovation : Moteur de recherche intelligent & PWA offline\n\nProximité : Support local 24/7 (chatbot, WhatsApp, email)",
    },
    {
        "name": "Contact",
        "route": "/contact",
        "title": "Contactez-nous",
        "desc": "Une question ? Un besoin ? Notre équipe vous répond rapidement.",
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
      <p className="text-lg text-[#F5F5F7] whitespace-pre-line">{desc}</p>
    </main>
    <Footer />
  </div>
);

export default {name};
'''

def create_pages():
    os.makedirs(PAGE_DIR, exist_ok=True)
    for page in PAGES:
        path = os.path.join(PAGE_DIR, f"{page['name']}.tsx")
        with open(path, "w", encoding="utf-8") as f:
            f.write(PAGE_TEMPLATE.format(**page))
        print(f"Page créée : {path}")

def patch_routes():
    with open(APP_PATH, "r", encoding="utf-8") as f:
        content = f.read()
    # Ajout des imports
    for page in PAGES:
        import_line = f"import {page['name']} from './pages/{page['name']}';"
        if import_line not in content:
            content = import_line + "\n" + content
    # Ajout des routes (pour React Router v6)
    if '<Routes>' in content:
        for page in PAGES:
            route_line = f'<Route path="{page["route"]}" element={{<{page["name"]} />}} />'
            if route_line not in content:
                # Ajoute avant </Routes>
                content = content.replace('</Routes>', f'  {route_line}\n</Routes>')
    with open(APP_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print("Routes ajoutées dans App.tsx")

if __name__ == "__main__":
    create_pages()
    patch_routes() 