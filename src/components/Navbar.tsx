import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Bell, Search, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, logout, getUserRole } from "@/utils/auth";
import { useUser } from "@/hooks/useUser";

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/formations", label: "Formations" },
  { to: "/candidates", label: "Candidats" },
  { to: "/jobs", label: "Emplois" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const { user } = useUser ? useUser() : { user: null };
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mosala-theme") === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Suggestions mock
  const suggestions = [
    { label: "Services Mosala", to: "/services" },
    { label: "Formations", to: "/formations" },
    { label: "Candidats", to: "/candidates" },
    { label: "Emplois", to: "/jobs" },
    { label: "Mon profil", to: "/profile" },
  ].filter(s => s.label.toLowerCase().includes(searchValue.toLowerCase()));

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 40) {
        setShowNavbar(true);
        lastScrollY.current = window.scrollY;
        return;
      }
      if (window.scrollY > lastScrollY.current) {
        setShowNavbar(false); // scroll down
      } else {
        setShowNavbar(true); // scroll up
      }
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mosala-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mosala-theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={`fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none transition-transform duration-500 ${showNavbar ? "translate-y-0" : "-translate-y-32"}`}>
      <nav className="pointer-events-auto w-full max-w-6xl mx-auto flex items-center justify-between px-8 py-4 bg-[var(--color-mosala-white)]/80 dark:bg-[var(--color-mosala-dark-900)]/80 backdrop-blur-xl rounded-full shadow-2xl border-2 border-[var(--color-mosala-green-200)] min-h-[80px] transition-colors duration-500" role="navigation" aria-label="Navigation principale Mosala">
        {/* Logo Mosala */}
        <Link to="/" className="flex items-center gap-3 font-extrabold text-3xl text-[var(--color-mosala-green-600)] tracking-tight focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-green-300)] transition-transform duration-200 hover:-translate-y-1">
          <img src="/lovable-uploads/logo-mosala1.png" alt="Logo Mosala" className="h-14 w-14 rounded-full bg-[var(--color-mosala-white)] border-2 border-[var(--color-mosala-green-200)] shadow-lg" />
        </Link>
        {/* Menu + actions alignés à droite */}
        <div className="flex items-center gap-1 ml-auto">
          <ul className="hidden md:flex gap-1 items-center text-sm" role="menubar">
            {navLinks.map(link => (
              <li key={link.to} role="none">
                <Link to={link.to} className="text-[var(--color-mosala-dark-700)] font-semibold px-2 py-1 rounded-full hover:bg-[var(--color-mosala-green-100)] transition text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-green-300)] transition-transform duration-200 hover:-translate-y-1" tabIndex={0} role="menuitem" aria-label={link.label}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Actions (recherche, notifications, darkmode, profil, burger) */}
          {/* Recherche globale */}
          <button
            className="p-3 rounded-full hover:bg-[var(--color-mosala-green-100)] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-green-300)] ripple"
            aria-label="Recherche globale"
            tabIndex={0}
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-6 h-6 text-[var(--color-mosala-green-700)]" />
          </button>
          {/* Overlay recherche */}
          {searchOpen && (
            <div className="fixed inset-0 z-[999] flex items-start justify-center bg-black/40 backdrop-blur-sm animate-fade-in" onClick={() => setSearchOpen(false)}>
              <div className="mt-32 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border-2 border-mosala-green-200 w-full max-w-lg mx-auto p-6 flex flex-col gap-4 relative" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Recherche Mosala">
                <div className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-mosala-green-700" />
                  <input
                    autoFocus
                    type="text"
                    value={searchValue}
                    onChange={e => setSearchValue(e.target.value)}
                    placeholder="Rechercher sur Mosala..."
                    className="flex-1 px-3 py-2 rounded-lg border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-100 text-mosala-dark-900 bg-white dark:bg-gray-800 shadow-inner text-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mosala-green-300"
                    aria-label="Recherche globale Mosala"
                    tabIndex={0}
                  />
                  <button className="ml-2 p-2 rounded-full hover:bg-mosala-green-100 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-mosala-green-300" onClick={() => setSearchOpen(false)} aria-label="Fermer la recherche" tabIndex={0}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <ul className="divide-y divide-mosala-green-50 max-h-60 overflow-y-auto" role="listbox">
                  {suggestions.length === 0 ? (
                    <li className="py-4 text-center text-mosala-dark-400">Aucun résultat</li>
                  ) : (
                    suggestions.map(s => (
                      <li key={s.to} role="option">
                        <Link to={s.to} className="block px-4 py-3 hover:bg-mosala-green-50 rounded-lg transition text-mosala-dark-700 font-semibold focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mosala-green-300" onClick={() => setSearchOpen(false)} tabIndex={0} aria-label={s.label}>
                          {s.label}
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          )}
          {/* Notifications (icône cloche + badge) */}
          {isAuthenticated() && (
            <div className="relative">
              <button
                className="p-3 rounded-full hover:bg-[var(--color-mosala-green-100)] transition relative focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-green-300)] ripple"
                aria-label="Notifications"
                aria-haspopup="true"
                aria-expanded={notifOpen}
                tabIndex={0}
                onClick={() => setNotifOpen(v => !v)}
              >
                <Bell className="w-6 h-6 text-[var(--color-mosala-green-700)]" />
                {/* Badge notifications (exemple statique) */}
                <span className="absolute -top-1 -right-1 bg-mosala-yellow-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow">3</span>
              </button>
              {/* Menu notifications */}
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-mosala-green-100 z-50 animate-fade-in-up" role="menu" aria-label="Notifications" aria-live="polite">
                  <div className="p-4 text-mosala-dark-700 font-semibold border-b border-mosala-green-50">Notifications</div>
                  <ul className="divide-y divide-mosala-green-50">
                    <li className="p-4 text-sm">Nouvelle offre d'emploi disponible</li>
                    <li className="p-4 text-sm">Votre profil a été mis à jour</li>
                    <li className="p-4 text-sm">Message de l'équipe Mosala</li>
                  </ul>
                  <div className="p-2 text-center">
                    <button className="text-mosala-green-600 hover:underline text-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mosala-green-300">Tout marquer comme lu</button>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* Dark mode toggle */}
          <button
            className="p-3 rounded-full hover:bg-[var(--color-mosala-green-100)] dark:hover:bg-[var(--color-mosala-dark-700)] transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-green-300)] ripple"
            aria-label={darkMode ? "Activer le mode clair" : "Activer le mode sombre"}
            tabIndex={0}
            onClick={() => setDarkMode(v => !v)}
          >
            {darkMode ? (
              <Sun className="w-6 h-6 text-[var(--color-mosala-yellow-500)] transition-transform duration-300 rotate-0" />
            ) : (
              <Moon className="w-6 h-6 text-[var(--color-mosala-green-700)] transition-transform duration-300 rotate-0" />
            )}
          </button>
          {/* Menu profil utilisateur contextuel */}
          {isAuthenticated() ? (
            <div className="relative group">
              <button
                className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] font-semibold hover:bg-[var(--color-mosala-green-600)] shadow-lg border-2 border-[var(--color-mosala-green-200)] transition text-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-green-300)] ripple hover:animate-cta-lift focus:animate-cta-lift"
                aria-label="Mon espace Mosala"
                aria-haspopup="true"
                aria-expanded={menuOpen}
                tabIndex={0}
                onClick={() => setMenuOpen(v => !v)}
              >
                <User className="w-6 h-6" />
                {user?.name || "Mon espace"}
              </button>
              {/* Menu déroulant profil */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-mosala-green-100 z-50 animate-fade-in-up" role="menu" aria-label="Menu utilisateur">
                  <ul className="py-2">
                    <li>
                      <Link to={getUserRole() === "recruteur" ? "/recruiter-space" : "/candidate-space"} className="block px-4 py-3 text-mosala-dark-700 hover:bg-mosala-green-50 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mosala-green-300" tabIndex={0} role="menuitem">Mon espace</Link>
                    </li>
                    <li>
                      <Link to="/profile" className="block px-4 py-3 text-mosala-dark-700 hover:bg-mosala-green-50 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mosala-green-300" tabIndex={0} role="menuitem">Profil</Link>
                    </li>
                    <li>
                      <Link to="/settings" className="block px-4 py-3 text-mosala-dark-700 hover:bg-mosala-green-50 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mosala-green-300" tabIndex={0} role="menuitem">Paramètres</Link>
                    </li>
                    <li>
                      <button onClick={handleLogout} className="w-full text-left px-4 py-3 text-mosala-red-600 hover:bg-mosala-red-50 rounded-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-mosala-green-300" tabIndex={0} role="menuitem">Déconnexion</button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] font-semibold hover:bg-[var(--color-mosala-green-600)] shadow-lg border-2 border-[var(--color-mosala-green-200)] transition text-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-green-300)] ripple hover:animate-cta-lift focus:animate-cta-lift" tabIndex={0} aria-label="Connexion Mosala">
              <User className="w-6 h-6" />
              Connexion
            </Link>
          )}
          {/* Burger menu mobile */}
          <button className="md:hidden ml-2 p-3 rounded-full hover:bg-[var(--color-mosala-green-100)] transition" onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>
        {/* Menu mobile */}
        {menuOpen && (
          <div className="absolute top-20 left-0 right-0 mx-auto w-11/12 max-w-md bg-[var(--color-mosala-white)] dark:bg-[var(--color-mosala-dark-900)] rounded-3xl shadow-2xl border-2 border-[var(--color-mosala-green-200)] flex flex-col items-center py-8 z-50 animate-fade-in-up">
            <ul className="flex flex-col gap-6 w-full items-center text-lg">
              {navLinks.map(link => (
                <li key={link.to} className="w-full">
                  <Link to={link.to} className="block w-full text-center text-[var(--color-mosala-dark-700)] font-semibold px-6 py-4 rounded-full hover:bg-[var(--color-mosala-green-100)] transition text-lg" onClick={() => setMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 w-full items-center">
              {isAuthenticated() ? (
                <>
                  <Link to={getUserRole() === "recruteur" ? "/recruiter-space" : "/candidate-space"} className="flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] font-semibold hover:bg-[var(--color-mosala-green-600)] transition w-full justify-center text-lg">
                    <User className="w-6 h-6" />
                    {user?.name || "Mon espace"}
                  </Link>
                  <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Déconnexion">
                    <LogOut className="w-6 h-6 text-[var(--color-mosala-green-700)]" />
                  </Button>
                </>
              ) : (
                <Link to="/login" className="flex items-center gap-2 px-6 py-4 rounded-full bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] font-semibold hover:bg-[var(--color-mosala-green-600)] transition w-full justify-center text-lg">
                  <User className="w-6 h-6" />
                  Connexion
                </Link>
              )}
            </div>
          </div>
        )}
      </nav>
      {/* Animation keyframes pour micro-animation CTA */}
      <style>{`
        @keyframes cta-lift {
          0% { transform: scale(1) translateY(0); box-shadow: 0 4px 24px 0 #00964033; }
          60% { transform: scale(1.06) translateY(-3px); box-shadow: 0 8px 32px 0 #00964055; }
          100% { transform: scale(1.02) translateY(-1px); box-shadow: 0 6px 28px 0 #00964044; }
        }
        .animate-cta-lift {
          animation: cta-lift 0.35s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </header>
  );
};

export default Navbar;
