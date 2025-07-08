import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const partnerLogos = [
    { src: "/lovable-uploads/dc40e710-f029-4dbb-9fbd-593f85573051.png", alt: "République Française & AFD" },
    { src: "/lovable-uploads/264fe1f1-8c99-414c-97df-7ea214db45d2.png", alt: "Union Européenne" },
    { src: "/lovable-uploads/06fd503e-1c4b-4b64-b908-766845da8a33.png", alt: "Ministère" },
  ];

  return (
    <footer className="bg-mosala-dark text-mosala-light">
      {/* Partners Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-8">
          <h3 className="text-center text-lg font-semibold mb-6">En partenariat avec</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center">
            {partnerLogos.map((partner, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <img 
                  src={partner.src} 
                  alt={partner.alt}
                  className="h-12 w-auto object-contain"
                />
              </div>
            ))}
          </div>
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
              <li><a href="/" className="text-gray-300 hover:text-mosala-yellow transition-colors">Accueil</a></li>
              <li><a href="/jobs" className="text-gray-300 hover:text-mosala-yellow transition-colors">Emplois & Formations</a></li>
              <li><a href="/about" className="text-gray-300 hover:text-mosala-yellow transition-colors">À propos</a></li>
              <li><a href="/blog" className="text-gray-300 hover:text-mosala-yellow transition-colors">Blog</a></li>
              <li><a href="/contact" className="text-gray-300 hover:text-mosala-yellow transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/dashboard" className="text-gray-300 hover:text-mosala-yellow transition-colors">Espace Candidat</a></li>
              <li><a href="/recruiter" className="text-gray-300 hover:text-mosala-yellow transition-colors">Espace Recruteur</a></li>
              <li><a href="/formations" className="text-gray-300 hover:text-mosala-yellow transition-colors">Formations</a></li>
              <li><a href="/faq" className="text-gray-300 hover:text-mosala-yellow transition-colors">FAQ</a></li>
              <li><a href="/support" className="text-gray-300 hover:text-mosala-yellow transition-colors">Support</a></li>
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
                <span className="text-sm">projetmosala@gmail.com</span>
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