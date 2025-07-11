import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const partnerLogos = [
  { src: "/lovable-uploads/dc40e710-f029-4dbb-9fbd-593f85573051.png", alt: "République Française & AFD" },
  { src: "/lovable-uploads/264fe1f1-8c99-414c-97df-7ea214db45d2.png", alt: "Union Européenne" },
  { src: "/lovable-uploads/06fd503e-1c4b-4b64-b908-766845da8a33.png", alt: "Ministère" },
];

function KenBurnsPartners() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % partnerLogos.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative w-full flex justify-center items-center h-28 md:h-32 overflow-hidden">
      <AnimatePresence initial={false}>
        {partnerLogos.map((partner, i) =>
          i === index && (
            <motion.div
              key={partner.src}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1.15 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
              className="absolute inset-0 flex justify-center items-center"
              aria-hidden={i !== index}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg flex items-center justify-center">
                <img 
                  src={partner.src} 
                  alt={partner.alt}
                  className="h-12 md:h-16 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>
          )
        )}
      </AnimatePresence>
    </div>
  );
}

const Footer = () => {
  return (
    <footer className="bg-[var(--color-mosala-dark-900)] text-[var(--color-mosala-white)] pt-12 pb-6 px-4 md:px-0">
      {/* Partners Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-center text-lg font-semibold mb-6">En partenariat avec</h3>
          <KenBurnsPartners />
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img 
              src="/lovable-uploads/1a173991-3aff-4b03-90e4-b87e9603efd0.png" 
              alt="MOSALA" 
              className="h-12 w-auto brightness-0 invert"
            />
            <p className="text-gray-300 text-sm">
              Renforcer l'employabilité des jeunes et réduire les inégalités d'accès à l'emploi en République du Congo.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-mosala-yellow cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-mosala-yellow cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-mosala-yellow cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-mosala-yellow cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-semibold text-white mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="/" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Accueil</a></li>
              <li><a href="/jobs" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Emplois & Formations</a></li>
              <li><a href="/services" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Services</a></li>
              <li><a href="/formations" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Formations</a></li>
              <li><a href="/candidates" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Espace Candidat</a></li>
              <li><a href="/recruiter-space" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Espace Recruteur</a></li>
              <li><a href="/about" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">À propos</a></li>
              <li><a href="/blog" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Support & FAQ</h4>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">FAQ</a></li>
              <li><a href="/support" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Support</a></li>
              <li><a href="/privacy" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Politique de confidentialité</a></li>
              <li><a href="/terms" className="text-[var(--color-mosala-white)] hover:text-[var(--color-mosala-yellow-400)] transition-colors">Conditions d'utilisation</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4 text-mosala-yellow" />
                <span className="text-sm">+242 06 802 00 06</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4 text-mosala-yellow" />
                <span className="text-sm">05 019 0606</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4 text-mosala-yellow" />
                <span className="text-sm">contact@mosala.org</span>
              </div>
              <div className="flex items-start space-x-2 text-gray-300">
                <MapPin className="h-4 w-4 text-mosala-yellow mt-0.5" />
                <span className="text-sm">Brazzaville, République du Congo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 MOSALA. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/privacy" className="text-gray-400 hover:text-mosala-yellow text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="/terms" className="text-gray-400 hover:text-mosala-yellow text-sm transition-colors">
                Conditions d'utilisation
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;