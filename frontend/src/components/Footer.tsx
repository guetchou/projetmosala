import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram, ExternalLink, Users, BookOpen, Briefcase, Globe } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Section principale */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Logo et description */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/topcenter-uploads/Logo-Mosala/logo-mosala1.png" 
                alt="Logo Mosala" 
                className="w-16 h-16 object-contain mr-4" 
              />
              <div>
                <h3 className="text-xl font-bold text-white">Projet MOSALA</h3>
                <p className="text-sm text-gray-300">Insertion professionnelle des jeunes</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed mb-6">
              Projet financé par l'AFD et l'Union Européenne pour renforcer l'employabilité des jeunes 
              et réduire les inégalités d'accès à l'emploi en République du Congo.
            </p>
            
            {/* Statistiques rapides */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-green-400">2,449</div>
                <div className="text-xs text-gray-400">Jeunes enrôlés</div>
              </div>
              <div className="text-center p-3 bg-white/5 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">6,600</div>
                <div className="text-xs text-gray-400">Visiteurs</div>
              </div>
            </div>
          </div>

          {/* Navigation rapide */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-green-400" />
              Services
            </h4>
            <div className="space-y-3">
              <a href="/jobs" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Offres d'emploi
              </a>
              <a href="/formations" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Formations qualifiantes
              </a>
              <a href="/caravane" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Caravane itinérante
              </a>
              <a href="/support" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Accompagnement
              </a>
              <a href="/blog" className="block text-gray-300 hover:text-green-400 transition-colors text-sm">
                Actualités
              </a>
            </div>
          </div>

          {/* Partenaires et institutions */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center">
              <Globe className="w-5 h-5 mr-2 text-blue-400" />
              Partenaires
            </h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Agence Française de Développement
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Union Européenne
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                Ministère de la Jeunesse
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                FONEA
              </div>
              <div className="flex items-center text-gray-300 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                ACPE
              </div>
            </div>
          </div>

          {/* Contact et informations */}
          <div>
            <h4 className="font-semibold text-lg mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2 text-green-400" />
              Contact
            </h4>
            <div className="space-y-4">
              <div className="flex items-start">
                <MapPin className="w-4 h-4 text-green-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm">Brazzaville, République du Congo</p>
                  <p className="text-gray-400 text-xs">4 villes visitées</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-blue-400 mr-3 flex-shrink-0" />
                <a href="mailto:contact@mosala.org" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  contact@mosala.org
                </a>
              </div>
              
              <div className="flex items-center">
                <Phone className="w-4 h-4 text-green-400 mr-3 flex-shrink-0" />
                <span className="text-gray-300 text-sm">+242 06 683 64 69</span>
              </div>
            </div>

            {/* Newsletter */}
            <div className="mt-6">
              <h5 className="font-medium text-sm mb-3 text-gray-200">Newsletter</h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-l-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-green-400/20 focus:border-green-400"
                />
                <button className="px-4 py-2 bg-green-500 text-white font-medium rounded-r-lg hover:bg-green-600 transition-colors text-sm">
                  S'abonner
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Barre de séparation */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* Copyright et informations légales */}
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-4">
                <span>© {currentYear} Projet MOSALA</span>
                <span className="hidden md:inline">•</span>
                <span>Financé par l'AFD et l'UE</span>
              </div>
            </div>

            {/* Liens légaux */}
            <div className="flex items-center gap-6 text-sm">
              <a href="/privacy" className="text-gray-400 hover:text-green-400 transition-colors">
                Confidentialité
              </a>
              <a href="/terms" className="text-gray-400 hover:text-green-400 transition-colors">
                Conditions d'utilisation
              </a>
              <a href="/legal" className="text-gray-400 hover:text-green-400 transition-colors">
                Mentions légales
              </a>
            </div>

            {/* Liens vers les sources officielles */}
            <div className="flex items-center gap-4">
              <a 
                href="https://jeunesse-sports.gouv.cg/2024/10/11/lancement-du-projet-mosala/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-green-400 transition-colors text-sm"
              >
                Ministère
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href="https://www.eeas.europa.eu/delegations/congo-brazzaville/insertion-professionnelle-des-jeunes-le-projet-mosala-est-lanc%C3%A9_und_en" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors text-sm"
              >
                Union Européenne
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;