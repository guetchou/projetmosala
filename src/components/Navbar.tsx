import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, Users, BookOpen, MessageCircle, ChevronDown, Search } from "lucide-react";
import { getUserRole, isAuthenticated, removeToken } from "@/utils/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout>();
  const navbarRef = useRef<HTMLElement>(null);

  const role = getUserRole();
  const authenticated = isAuthenticated();

  // Menus regroupés
  const menuGroups = [
    {
      label: "Emplois & Formations",
      href: "/jobs",
      icon: Briefcase,
    },
    {
      label: "Annuaire",
      children: [
        { href: "/candidates", label: "Candidats", icon: Users },
        { href: "/employers", label: "Employeurs", icon: Briefcase },
      ],
    },
    {
      label: "Ressources",
      children: [
        { href: "/about", label: "À propos", icon: Users },
        { href: "/blog", label: "Blog", icon: BookOpen },
        { href: "/contact", label: "Contact", icon: MessageCircle },
      ],
    },
  ];

  // Effet de scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fermer le menu quand on clique à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Gestion intelligente du hover dropdown
  const handleDropdownEnter = (label: string) => {
    clearTimeout(dropdownTimeoutRef.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 200);
  };

  return (
    <nav 
      ref={navbarRef}
      className={`bg-mosala-white/90 backdrop-blur-md sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "shadow-sm border-b border-mosala-dark-100/50" : "border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo avec effet de scale amélioré */}
          <a href="/" className="flex items-center group" tabIndex={0} aria-label="Accueil Mosala">
            <img 
              src="/lovable-uploads/logo-mosala1.png" 
              alt="MOSALA" 
              width={240}
              height={60}
              className={`h-12 w-auto transition-all duration-300 ${
                isScrolled ? "scale-95" : "scale-100"
              } group-hover:scale-105`}
              loading="lazy"
            />
          </a>

          {/* Barre de recherche (mobile) */}
          <button className="md:hidden p-2 rounded-lg hover:bg-mosala-green-50 transition-colors">
            <Search className="w-5 h-5 text-mosala-dark-200" />
          </button>

          {/* Desktop Menu avec effets Vercel-like */}
          <div className="hidden md:flex items-center space-x-1">
            <a 
              href="/" 
              className="text-mosala-dark-500 hover:text-mosala-green-500 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-mosala-green-50"
            >
              Accueil
            </a>
            
            {menuGroups.map((group) =>
              group.children ? (
                <div
                  key={group.label}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(group.label)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button 
                    className="text-mosala-dark-500 hover:text-mosala-green-500 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-mosala-green-50 flex items-center gap-1"
                    aria-expanded={openDropdown === group.label}
                    aria-haspopup="true"
                  >
                    {group.label}
                    <ChevronDown className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                      openDropdown === group.label ? "rotate-180" : ""
                    }`} />
                  </button>
                  
                  {/* Dropdown style Vercel */}
                  <div
                    className={`absolute left-0 mt-2 w-48 bg-mosala-white rounded-lg shadow-lg ring-1 ring-gray-900/5 overflow-hidden transition-all duration-200 z-50 ${
                      openDropdown === group.label
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-1 pointer-events-none"
                    }`}
                  >
                    <div className="py-1">
                      {group.children.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className="flex items-center px-4 py-2 text-mosala-dark-300 hover:bg-mosala-green-50 hover:text-mosala-green-500 transition-colors"
                        >
                          <item.icon className="w-4 h-4 mr-2 text-mosala-dark-200" />
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={group.href}
                  href={group.href}
                  className="text-mosala-dark-500 hover:text-mosala-green-500 transition-colors font-medium px-3 py-2 rounded-lg hover:bg-mosala-green-50"
                >
                  {group.label}
                </a>
              )
            )}
          </div>

          {/* CTA et recherche (desktop) */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative mx-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mosala-dark-200" />
              <input
                type="text"
                placeholder="Rechercher..."
                className="pl-10 pr-4 py-2 text-sm rounded-lg border border-mosala-dark-100 focus:border-mosala-green-500 focus:ring-1 focus:ring-mosala-green-500/50 outline-none transition-all w-64"
              />
            </div>

            {authenticated && role === "admin" && (
              <a href="/admin-dashboard" className="btn btn-outline">Admin</a>
            )}
            {authenticated && role === "recruteur" && (
              <a href="/recruiter-space" className="btn btn-outline">Espace Recruteur</a>
            )}
            {authenticated && role === "candidat" && (
              <a href="/profile-creation" className="btn btn-outline">Mon Profil</a>
            )}
            {!authenticated && (
              <>
                <Button variant="ghost" className="text-[#18182f] hover:bg-gray-100/50">Connexion</Button>
                <Button className="relative overflow-hidden group bg-gradient-to-r from-[#6E45E2] to-[#00C4CC] hover:from-[#6E45E2]/90 hover:to-[#00C4CC]/90">
                  <span className="relative z-10">S'inscrire</span>
                  <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </>
            )}
            {authenticated && (
              <Button variant="outline" onClick={() => { removeToken(); window.location.href = "/"; }}>Déconnexion</Button>
            )}
          </div>

          {/* Bouton mobile */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-mosala-green-50 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-mosala-dark-500" />
            ) : (
              <Menu className="w-6 h-6 text-mosala-dark-500" />
            )}
          </button>
        </div>

        {/* Menu mobile avec transitions */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen pb-4" : "max-h-0"
        }`}>
          <div className="pt-2 space-y-1">
            <div className="px-4 mb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-mosala-dark-200" />
                <input
                  type="text"
                  placeholder="Rechercher..."
                  className="pl-10 pr-4 py-2 text-sm rounded-lg border border-mosala-dark-100 focus:border-mosala-green-500 focus:ring-1 focus:ring-mosala-green-500/50 outline-none transition-all w-full"
                />
              </div>
            </div>

            <a 
              href="/" 
              className="block px-4 py-3 text-mosala-dark-500 hover:bg-mosala-green-50 rounded-lg font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </a>
            
            {menuGroups.map((group) =>
              group.children ? (
                <div key={group.label} className="px-1">
                  <div className="px-3 py-2 font-medium text-mosala-dark-500">
                    {group.label}
                  </div>
                  <div className="pl-4 flex flex-col">
                    {group.children.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        className="px-3 py-2 text-mosala-dark-300 hover:bg-mosala-green-50 rounded-lg flex items-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <item.icon className="w-4 h-4 mr-2 text-mosala-dark-200" />
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={group.href}
                  href={group.href}
                  className="block px-4 py-3 text-mosala-dark-500 hover:bg-mosala-green-50 rounded-lg font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {group.label}
                </a>
              )
            )}
            
            <div className="px-1 pt-2 mt-2 border-t border-mosala-dark-100 space-y-2">
              <Button 
                variant="outline" 
                className="w-full border-[#6E45E2] text-[#6E45E2] hover:bg-mosala-green-500/10"
              >
                Connexion
              </Button>
              <Button className="w-full bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 hover:from-mosala-green-600 hover:to-mosala-yellow-600">
                S'inscrire
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;