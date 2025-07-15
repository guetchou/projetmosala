import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowRight, Star } from "lucide-react";
import Navbar from "@/components/Navbar";

const JobListings = () => {
  const [email, setEmail] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Spécialiste Marketing Digital",
      company: "Attest@ovem - Delftie",
      description: "Développez et exécutez des stratégies de marketing digital pour augmenter notre présence en ligne.",
      tags: ["Spécialiste en 2025", "Consultation complément", "1.2 pts."],
      salary: "1 000 000 - 2 500 000 FCFA",
      color: "bg-[#E6F5EC]" // Vert adouci
    },
    {
      id: 2,
      title: "Développeur Full Stack",
      company: "Technologie - Brazzaville",
      description: "Nous recherchons un développement Full Stack expérimenté pour rejoindre notre équipe dynamique à Brazzaville.",
      details: [
        "3x ans d'expérience en développement : 12pts",
        "Maison de recherche, finance financier : 13 pts"
      ],
      salary: "2 000 000 - 3 000 000 FCFA",
      color: "bg-[#FFF8E6]" // Jaune adouci
    },
    {
      id: 3,
      title: "Ingénieur DevOps",
      company: "Consultants - Patrice Mero",
      description: "Dans notre infrastructure cloué et améliorant nos processus de déploiement continu.",
      tags: ["Spécialiste en 2025", "Maison de fonction de documental", "1.2 pts."],
      salary: "3 000 000 - 4 000 000 FCFA",
      color: "bg-[#FFEEEE]" // Rouge adouci
    },
    {
      id: 4,
      title: "Chef de Projet Digital",
      company: "Innovations - Brazzaville",
      description: "Dirigez des projets digitaux innovants du concept à la livraison.",
      details: [
        "3x ans d'expérience en système : 12 pts",
        "Conférence libre ou équivalent : 12 pts"
      ],
      salary: "3 500 000 - 4 500 000 FCFA",
      color: "bg-[#E6F5EC]" // Vert adouci
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div
        aria-hidden="true"
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/lovable-uploads/bg-mosala.jpg')",
          opacity: 0.18,
          filter: "blur(1.5px)"
        }}
      />
      <div className="mt-12 mb-12">
        <Navbar />
      </div>
      <div className="w-full bg-[#FFF8E6] border-b border-[#FFE0B2] shadow-sm">
        <div className="container mx-auto px-6 py-6 flex flex-col items-center justify-center">
          <span className="sr-only">Emplois Mosala</span>
          <span className="sr-only">Des opportunités pour tous les talents</span>
        </div>
      </div>
      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 pt-[64px]">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-24 mb-6">
            Offres d'emploi
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-20 max-w-2xl">
            Découvrez les meilleures opportunités professionnelles adaptées à votre profil
          </p>
          {/* Séparateur décoratif */}
          <svg className="w-full h-6 mb-10" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill="#FFF8E6" d="M0,0 C480,60 960,0 1440,60 L1440,60 L0,60 Z"/>
          </svg>
          {/* Barre de recherche et filtres */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <input type="text" placeholder="Rechercher un poste, une entreprise..." className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32] text-sm" />
            <select className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32]">
              <option>Ville</option>
              <option>Brazzaville</option>
              <option>Delftie</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32]">
              <option>Type de contrat</option>
              <option>CDI</option>
              <option>CDD</option>
              <option>Stage</option>
            </select>
            <select className="px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32]">
              <option>Secteur</option>
              <option>Technologie</option>
              <option>Marketing</option>
              <option>Consulting</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          {jobs.map((job) => (
            <motion.div 
              key={job.id}
              whileHover={{ y: -5 }}
              className={`${job.color} rounded-2xl shadow-lg overflow-hidden border border-gray-200/50`}
            >
              <div className="flex items-center gap-4 p-6 pb-0">
                <img src="/lovable-uploads/logo-mosala1.png" alt="Logo entreprise" className="h-14 w-14 rounded-full border-2 border-white shadow-md bg-white object-contain" />
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-900 mb-1">{job.title}</h2>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 mb-1">
                    <span>{job.company}</span>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-400" />
                    <span><MapPin className="inline h-4 w-4 mr-1 text-[#2E7D32]" />Brazzaville</span>
                    <span className="inline-block w-1 h-1 rounded-full bg-gray-400" />
                    <span>Publié il y a 3j</span>
                  </div>
                </div>
                <button className="text-[#2E7D32] hover:text-[#1B5E20]">
                  <Star className="h-5 w-5" />
                </button>
              </div>
              <div className="p-6 pt-2">
                <p className="text-gray-700 mb-4">{job.description}</p>
                {job.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.tags.map((tag, i) => (
                      <span key={i} className="bg-white/80 text-gray-700 text-xs px-3 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {job.details && (
                  <ul className="space-y-2 mb-4">
                    {job.details.map((detail, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start">
                        <span className="mr-2">•</span> {detail}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200/50">
                  <span className="font-bold text-gray-900 text-lg">{job.salary}</span>
                  <button className="flex items-center gap-1 bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-5 py-2 rounded-full font-semibold shadow transition">
                    Voir l'offre <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Pagination simple */}
        <div className="flex justify-center mt-16">
          <button className="px-8 py-3 rounded-full bg-[#eff6ff] text-[#2563eb] font-semibold shadow hover:bg-[#93c5fd] transition">
            Charger plus d'offres
          </button>
        </div>

        {/* Section Nos résultats (professionnelle et moderne, bleu institutionnel) */}
        <section className="container mx-auto px-6 py-24">
          {/* Badge et titre */}
          <div className="flex flex-col items-center mb-12">
            <span className="inline-block bg-[#eff6ff] text-[#2563eb] font-semibold px-4 py-1 rounded-full text-xs tracking-wide shadow mb-6">
              Nos résultats
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1e40af] mb-4 text-center leading-tight">
              L'impact Mosala en chiffres
            </h2>
            <p className="text-lg md:text-xl text-[#2563eb] max-w-2xl text-center mb-10 font-medium">
              Notre engagement se traduit par des résultats concrets pour l’emploi et l’entrepreneuriat en Afrique centrale.
            </p>
            {/* Séparateur décoratif bleu pastel */}
            <svg className="w-40 h-5 mb-12" viewBox="0 0 160 20" fill="none">
              <path d="M0,10 Q40,20 80,10 Q120,0 160,10" stroke="#93c5fd" strokeWidth="4" fill="none" />
            </svg>
          </div>

          {/* Chiffres clés */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-20">
            <div className="bg-white rounded-3xl shadow-xl p-12 flex flex-col items-center transition hover:scale-105 hover:shadow-2xl duration-300">
              <div className="text-6xl font-extrabold text-[#2563eb] mb-3">+1200</div>
              <div className="text-lg font-semibold text-[#1e40af] mb-1">emplois pourvus</div>
              <div className="text-[#64748b] text-base text-center">en 2024 grâce à Mosala</div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-12 flex flex-col items-center transition hover:scale-105 hover:shadow-2xl duration-300">
              <div className="text-6xl font-extrabold text-[#2563eb] mb-3">98%</div>
              <div className="text-lg font-semibold text-[#1e40af] mb-1">de satisfaction</div>
              <div className="text-[#64748b] text-base text-center">chez nos bénéficiaires</div>
            </div>
            <div className="bg-white rounded-3xl shadow-xl p-12 flex flex-col items-center transition hover:scale-105 hover:shadow-2xl duration-300">
              <div className="text-6xl font-extrabold text-[#2563eb] mb-3">+50</div>
              <div className="text-lg font-semibold text-[#1e40af] mb-1">partenaires actifs</div>
              <div className="text-[#64748b] text-base text-center">entreprises & institutions</div>
            </div>
          </div>

          {/* Encart partenaires */}
          <div className="max-w-3xl mx-auto bg-[#eff6ff] rounded-3xl shadow-xl p-12 flex flex-col items-center text-center">
            <div className="text-xl font-semibold text-[#1e40af] mb-4">Ils nous font confiance</div>
            <div className="flex flex-wrap justify-center gap-8 mt-2">
              <img src="/lovable-uploads/partner1.png" alt="Partenaire 1" className="h-12 w-24 object-contain bg-white rounded-xl p-2 grayscale" />
              <img src="/lovable-uploads/partner2.png" alt="Partenaire 2" className="h-12 w-24 object-contain bg-white rounded-xl p-2 grayscale" />
              <img src="/lovable-uploads/partner3.png" alt="Partenaire 3" className="h-12 w-24 object-contain bg-white rounded-xl p-2 grayscale" />
              {/* ... */}
            </div>
          </div>
        </section>
        {/* Newsletter */}
        <div className="mt-32 bg-white rounded-lg shadow-md p-12 max-w-3xl mx-auto">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Recevez les nouvelles offres d'emploi</h3>
          <p className="text-gray-600 mb-6">
            Inscrivez-vous pour recevoir les dernières offres correspondant à votre profil directement dans votre boîte mail.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Votre adresse email"
              className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-[#2E7D32]"
            />
            <button className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 py-3 rounded-lg font-medium transition">
              S'inscrire
            </button>
          </div>
        </div>
      </main>

      <div className="mt-24" />

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-6">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="/lovable-uploads/logo-mosala1.png" alt="Logo Mosala" className="h-12 w-12 mb-4 rounded-full border-2 border-[#2E7D32] bg-white shadow" />
            <p className="text-gray-600">
              Plateforme de formation et d'accompagnement pour l'emploi et l'entreprenariat.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2">
              {["Accueil", "Formations", "Emplois", "À propos"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-[#2E7D32] transition">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-600">
                <Mail className="h-5 w-5 mr-2 text-[#2E7D32]" />
                contact@nosala.org
              </li>
              <li className="flex items-center text-gray-600">
                <Phone className="h-5 w-5 mr-2 text-[#2E7D32]" />
                +243 432 6000 400X
              </li>
              <li className="flex items-center text-gray-600">
                <MapPin className="h-5 w-5 mr-2 text-[#2E7D32]" />
                Brazzaville, République du Congo
              </li>
            </ul>
          </div>
        </div>

        <div className="container mx-auto mt-12 pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 MOSALA. Tous droits réservés.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-[#2E7D32] transition">
              Politique de confidentialité
            </a>
            <a href="#" className="text-gray-500 hover:text-[#2E7D32] transition">
              Conditions d'utilisation
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default JobListings;