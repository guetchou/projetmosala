import React from "react";
import { MoreHorizontal } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const actualites = [
  {
    image: "/images/atelier-cv.png",
    tag: "#Événement",
    title: "Atelier CV & Entretien le 15 juin",
    date: "Publié le 10 juin 2024",
    summary: "Participez à notre atelier gratuit pour optimiser votre CV et réussir vos entretiens d’embauche.",
    link: "/actualites/atelier-cv"
  },
  {
    image: "frontend/public/topcenter-uploads/support/support.jpeg",
    tag: "#Annonce",
    title: "Nouveau partenariat avec CongoTech",
    date: "Publié le 8 juin 2024",
    summary: "Mosala s’associe à CongoTech pour offrir plus d’opportunités aux jeunes talents.",
    link: "/actualites/partenariat-congotech"
  },
  {
    image: "frontend/public/topcenter-uploads/pexel/pexels-kindelmedia-8487371.jpg",
    tag: "#Témoignage",
    title: "Success story : Grâce a trouvé un emploi via Mosala",
    date: "Publié le 5 juin 2024",
    summary: "Découvrez le parcours inspirant de Grâce, récemment recrutée grâce à la plateforme Mosala.",
    link: "/actualites/success-grace"
  }
];

const Actualites = () => (
  <section className="actualites-section py-12 bg-mosala-green-50">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-2 text-[#005F25]">Dernières actualités</h2>
      <p className="text-lg text-[#005F25] mb-8">
        Restez informé des nouveautés, événements et succès de la communauté.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {actualites.map((actu, idx) => (
          <div key={idx} className="actualite-card bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col overflow-hidden relative">
            {/* Mini-menu contextuel */}
            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button
                  className="absolute top-3 right-3 z-10 p-2 rounded-full hover:bg-mosala-green-50 focus:outline-none focus:ring-2 focus:ring-mosala-green-200"
                  aria-label="Ouvrir le menu"
                  type="button"
                >
                  <MoreHorizontal className="w-5 h-5 text-[#005F25]" />
                </button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content sideOffset={8} className="bg-white rounded-lg shadow-lg border border-mosala-green-100 py-2 min-w-[160px]">
                <DropdownMenu.Item className="px-4 py-2 text-sm text-[#005F25] hover:bg-mosala-green-50 cursor-pointer">Signaler</DropdownMenu.Item>
                <DropdownMenu.Item className="px-4 py-2 text-sm text-[#005F25] hover:bg-mosala-green-50 cursor-pointer" onClick={() => navigator.clipboard.writeText(window.location.origin + actu.link)}>Copier le lien</DropdownMenu.Item>
                <DropdownMenu.Item className="px-4 py-2 text-sm text-[#005F25] hover:bg-mosala-green-50 cursor-pointer">Partager</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
            <img
              src={actu.image}
              alt={actu.title}
              className="actualite-image w-full h-48 object-cover"
            />
            <span className="actualite-tag bg-gray-600 text-white font-semibold text-xs rounded px-3 py-1 mt-4 ml-4 w-fit">
              {actu.tag}
            </span>
            <div className="p-4 flex-1 flex flex-col">
              <div className="actualite-title text-lg font-bold mb-1 text-[#005F25]">{actu.title}</div>
              <div className="actualite-date text-[#B3F3E1] text-xs mb-2">{actu.date}</div>
              <div className="actualite-summary text-[#005F25] mb-4 flex-1">
                {actu.summary}
              </div>
              <a
                href={actu.link.startsWith('/blog') ? actu.link : '/blog'}
                className="actualite-link text-[#BFFF00] font-semibold hover:underline"
              >
                Lire la suite
              </a>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-8">
        <a
          href="/blog"
          className="btn btn-primary bg-gray-700 text-white px-6 py-3 rounded-full font-bold shadow hover:bg-gray-600 transition"
        >
          Voir toutes les actualités
        </a>
      </div>
    </div>
  </section>
);

export default Actualites; 