import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#22304a] pt-8 pb-4 px-4 md:px-0 border-t border-[#2fdab8]/10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* Logo & Description */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <img src="/topcenter-uploads/Logo-Mosala/logo-mosala1.png" alt="Logo Mosala" className="w-12 h-12 object-contain mb-1" />
          <p className="text-[#f6f9fc]/90 text-sm leading-relaxed max-w-md">
            Renforcer l'employabilité des jeunes et réduire les inégalités d'accès à l'emploi en République du Congo.
          </p>
          {/* Réseaux sociaux */}
          <div className="flex gap-2 mt-2">
            <a href="#" className="p-3 bg-[#2fdab8]/10 hover:bg-[#2fdab8]/30 rounded-full transition shadow text-[#2fdab8] hover:text-[#22304a] hover:bg-[#2fdab8]">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="#" className="p-3 bg-[#6476f3]/10 hover:bg-[#6476f3]/30 rounded-full transition shadow text-[#6476f3] hover:text-[#22304a] hover:bg-[#6476f3]">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="p-3 bg-[#2fdab8]/10 hover:bg-[#2fdab8]/30 rounded-full transition shadow text-[#2fdab8] hover:text-[#22304a] hover:bg-[#2fdab8]">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="p-3 bg-[#6476f3]/10 hover:bg-[#6476f3]/30 rounded-full transition shadow text-[#6476f3] hover:text-[#22304a] hover:bg-[#6476f3]">
              <Instagram className="h-5 w-5" />
            </a>
          </div>
        </div>
        {/* Navigation & Support */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <div>
            <h4 className="font-bold text-lg text-[#2fdab8] mb-4">Navigation</h4>
            <div className="flex flex-col gap-2">
              <a href="/" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Accueil</a>
              <a href="/services" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Services</a>
              <a href="/jobs" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Emplois</a>
              <a href="/formations" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Formations</a>
              <a href="/about" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">À propos</a>
              <a href="/candidates" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Candidats</a>
              <a href="/recruiter-space" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Recruteurs</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#2fdab8] mb-4">Support & Légal</h4>
            <div className="flex flex-col gap-2">
              <a href="/faq" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">FAQ</a>
              <a href="/support" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Support</a>
              <a href="/privacy" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Confidentialité</a>
              <a href="/terms" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Conditions</a>
              <a href="/legal" className="text-[#f6f9fc]/80 hover:text-[#2fdab8] transition font-medium">Mentions légales</a>
            </div>
          </div>
        </div>
        {/* Contact & Newsletter */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          <div>
            <h4 className="font-bold text-lg text-[#2fdab8] mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#f6f9fc]/90">
                <Phone className="h-4 w-4 text-[#2fdab8]" /> <span>+242 06 802 00 06</span>
              </div>
              <div className="flex items-center gap-2 text-[#f6f9fc]/90">
                <Mail className="h-4 w-4 text-[#6476f3]" /> <span>contact@mosala.org</span>
              </div>
              <div className="flex items-center gap-2 text-[#f6f9fc]/90">
                <MapPin className="h-4 w-4 text-[#2fdab8]" /> <span>Brazzaville, République du Congo</span>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-lg text-[#2fdab8] mb-2">Newsletter</h4>
            <p className="text-[#f6f9fc]/70 text-xs mb-2">Restez informé des dernières opportunités et actualités Mosala.</p>
            <div className="flex gap-1">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-2 py-2 bg-[#22304a] border border-[#2fdab8]/30 rounded-lg text-[#f6f9fc] placeholder-[#2fdab8]/40 focus:outline-none focus:ring-2 focus:ring-[#2fdab8]/20 focus:border-[#2fdab8] text-xs"
              />
              <button className="px-3 py-2 bg-[#2fdab8] text-[#22304a] font-bold rounded-lg hover:shadow-lg transition-all duration-300 hover:bg-[#2fdab8]/80 text-xs">
                S'abonner
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Bottom Bar */}
      <div className="border-t border-[#2fdab8]/10 mt-6 bg-[#22304a]/95">
        <div className="container mx-auto px-4 py-2 flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <p className="text-[#f6f9fc]/60 text-xs">© 2024 MOSALA. Tous droits réservés.</p>
            <span className="text-[#2fdab8]/20">•</span>
            <p className="text-[#f6f9fc]/60 text-xs">Développé par Top Center</p>
          </div>
          <div className="flex items-center gap-4">
            <a href="/about" className="text-[#f6f9fc]/60 hover:text-[#2fdab8] text-xs transition-colors duration-300">À propos</a>
            <a href="/privacy" className="text-[#f6f9fc]/60 hover:text-[#2fdab8] text-xs transition-colors duration-300">Confidentialité</a>
            <a href="/terms" className="text-[#f6f9fc]/60 hover:text-[#2fdab8] text-xs transition-colors duration-300">Conditions</a>
            <a href="/legal" className="text-[#f6f9fc]/60 hover:text-[#2fdab8] text-xs transition-colors duration-300">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;