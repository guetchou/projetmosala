import { useState, useEffect, useRef, useReducer, useCallback, forwardRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, Bell, Search, Sun, Moon, MoreVertical, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAuthenticated, logout, getUserRole } from "@/utils/auth";
import { useUser } from "@/hooks/useUser";
import { useNavbarShrink } from "@/hooks/useNavbarShrink";
import { useNavbar } from "@/contexts/NavbarContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import "@/styles/navbar.css";

// Types pour le reducer
type NavbarState = {
  menuOpen: boolean;
  showNavbar: boolean;
  secondaryMenuOpen: boolean;
  searchOpen: boolean;
  searchValue: string;
  darkMode: boolean;
};

type NavbarAction = 
  | { type: 'TOGGLE_MENU' }
  | { type: 'SET_SHOW_NAVBAR'; payload: boolean }
  | { type: 'TOGGLE_SECONDARY_MENU' }
  | { type: 'SET_SEARCH_OPEN'; payload: boolean }
  | { type: 'SET_SEARCH_VALUE'; payload: string }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'CLOSE_ALL' };

// Reducer pour centraliser la logique d'état
const navbarReducer = (state: NavbarState, action: NavbarAction): NavbarState => {
  switch (action.type) {
    case 'TOGGLE_MENU':
      return { ...state, menuOpen: !state.menuOpen, secondaryMenuOpen: false, searchOpen: false };
    case 'SET_SHOW_NAVBAR':
      return { ...state, showNavbar: action.payload };
    case 'TOGGLE_SECONDARY_MENU':
      return { ...state, secondaryMenuOpen: !state.secondaryMenuOpen, menuOpen: false, searchOpen: false };
    case 'SET_SEARCH_OPEN':
      return { ...state, searchOpen: action.payload, menuOpen: false, secondaryMenuOpen: false };
    case 'SET_SEARCH_VALUE':
      return { ...state, searchValue: action.payload };
    case 'TOGGLE_DARK_MODE':
      return { ...state, darkMode: !state.darkMode };
    case 'CLOSE_ALL':
      return { ...state, menuOpen: false, secondaryMenuOpen: false, searchOpen: false };
    default:
      return state;
  }
};

// État initial
const initialState: NavbarState = {
  menuOpen: false,
  showNavbar: true,
  secondaryMenuOpen: false,
  searchOpen: false,
  searchValue: "",
  darkMode: (() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("mosala-theme") === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  })(),
};

const navLinks = [
  { to: "/", label: "Accueil" },
  { to: "/services", label: "Services" },
  { to: "/formations", label: "Formations" },
  { to: "/candidates", label: "Candidats" },
  { to: "/jobs", label: "Emplois" },
  { to: "/about", label: "À propos" },
  { to: "/support", label: "Support" },
];



interface NavbarProps {
  className?: string;
}

const Navbar = forwardRef<HTMLElement, NavbarProps>((props, ref) => {
  const [state, dispatch] = useReducer(navbarReducer, initialState);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();
  const { user } = useUser();
  const { setNavbarHeight, isScrolled } = useNavbar();
  const prefersReducedMotion = useReducedMotion();
  const navbarRef = useRef<HTMLElement>(null);

  // Mesurer et exposer la hauteur de la navbar
  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        const height = navbarRef.current.offsetHeight;
        setNavbarHeight(height);
        // Exposer la hauteur au CSS pour le Hero
        document.documentElement.style.setProperty('--nav-h', `${height}px`);
      }
    };

    updateNavbarHeight();
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, [setNavbarHeight]);

  // Hook pour le shrink de la navbar
  const shrink = useNavbarShrink(40);

  // Suggestions mock avec debounce
  const suggestions = [
    { label: "Services Mosala", to: "/services" },
    { label: "Formations", to: "/formations" },
    { label: "Candidats", to: "/candidates" },
    { label: "Emplois", to: "/jobs" },
    { label: "Mon profil", to: "/profile" },
  ].filter(s => s.label.toLowerCase().includes(state.searchValue.toLowerCase()));

  // Gestion du scroll optimisée avec seuil et hystérésis
  useEffect(() => {
    const THRESHOLD = 40;
    const HYSTERESIS = 24;
    let lastIntent: 'up' | 'down' | null = null;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < THRESHOLD) {
        dispatch({ type: 'SET_SHOW_NAVBAR', payload: true });
        lastIntent = null;
        lastScrollY.current = currentScrollY;
        return;
      }

      const scrollDelta = currentScrollY - lastScrollY.current;
      
      if (Math.abs(scrollDelta) < HYSTERESIS) {
        return; // Ignorer les petits mouvements
      }

      if (scrollDelta > 0 && lastIntent !== 'down') {
        // Scroll vers le bas
        dispatch({ type: 'SET_SHOW_NAVBAR', payload: false });
        lastIntent = 'down';
      } else if (scrollDelta < 0 && lastIntent !== 'up') {
        // Scroll vers le haut
        dispatch({ type: 'SET_SHOW_NAVBAR', payload: true });
        lastIntent = 'up';
      }

      lastScrollY.current = currentScrollY;
    };

    // Throttle pour les performances
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll);
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  // Gestion du dark mode
  useEffect(() => {
    if (state.darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("mosala-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("mosala-theme", "light");
    }
  }, [state.darkMode]);

  // Gestion des clics en dehors avec ref containment
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (navbarRef.current && !navbarRef.current.contains(target)) {
        dispatch({ type: 'CLOSE_ALL' });
      }
    };

    if (state.menuOpen || state.secondaryMenuOpen || state.searchOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [state.menuOpen, state.secondaryMenuOpen, state.searchOpen]);

  const handleLogout = useCallback(() => {
    logout();
    navigate("/login");
  }, [navigate]);

  // Refs pour le focus return
  const secondaryMenuButtonRef = useRef<HTMLButtonElement>(null);
  const searchButtonRef = useRef<HTMLButtonElement>(null);

  // Gestion clavier (Escape)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        dispatch({ type: 'CLOSE_ALL' });
        // Return focus au bouton approprié
        if (state.secondaryMenuOpen && secondaryMenuButtonRef.current) {
          secondaryMenuButtonRef.current.focus();
        } else if (state.searchOpen && searchButtonRef.current) {
          searchButtonRef.current.focus();
        }
      }
    };

    if (state.menuOpen || state.secondaryMenuOpen || state.searchOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [state.menuOpen, state.secondaryMenuOpen, state.searchOpen]);

  // Actions optimisées
  const toggleMenu = useCallback(() => dispatch({ type: 'TOGGLE_MENU' }), []);
  const toggleSecondaryMenu = useCallback(() => dispatch({ type: 'TOGGLE_SECONDARY_MENU' }), []);
  const toggleDarkMode = useCallback(() => dispatch({ type: 'TOGGLE_DARK_MODE' }), []);
  const setSearchOpen = useCallback((open: boolean) => dispatch({ type: 'SET_SEARCH_OPEN', payload: open }), []);
  const setSearchValue = useCallback((value: string) => dispatch({ type: 'SET_SEARCH_VALUE', payload: value }), []);

  return (
    <header
      ref={(el) => {
        // Forward ref et ref local
        if (typeof ref === 'function') ref(el);
        else if (ref) ref.current = el;
        navbarRef.current = el;
      }}
      className={`fixed top-0 left-0 right-0 transition-all duration-300 ease-in-out bg-white/70 backdrop-blur-lg border-b border-white/20 z-50 ${isScrolled ? 'py-2' : 'py-4'} ${state.showNavbar ? "translate-y-0" : "-translate-y-full"}`}
      style={{
        transitionDuration: prefersReducedMotion ? '0.1s' : '0.3s'
      }}
    >
      <nav
        data-navbar
        className={`pointer-events-auto w-full max-w-7xl mx-auto flex items-center justify-between px-6 transition-all duration-500 min-h-[48px] ${isScrolled ? 'max-w-6xl' : 'max-w-7xl'}`}
        role="navigation"
        aria-label="Navigation principale Mosala"
      >
        {/* Logo Mosala */}
        <Link to="/" className="flex items-center gap-3 font-extrabold text-2xl text-mosala-dark-900 tracking-tight transition-transform duration-200 hover:-translate-y-1">
          <img 
            src="/topcenter-uploads/Logo-Mosala/logo-mosala1.png" 
            alt="Logo Mosala" 
            className="w-16 h-16 object-contain"
          />
        </Link>

        {/* Navigation principale - visible sur desktop */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="text-mosala-green font-medium hover:text-mosala-yellow transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mosala-green focus-visible:ring-offset-2 rounded-md px-2 py-1 hover:bg-white/30 hover:backdrop-blur-sm"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Actions principales */}
        <div className="flex items-center gap-3">
          {/* Recherche - simplifiée */}
          <Button
            ref={searchButtonRef}
            variant="ghost"
            size="sm"
            onClick={() => setSearchOpen(!state.searchOpen)}
            className="p-2 text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm rounded-full"
            aria-label="Rechercher"
            aria-expanded={state.searchOpen}
            aria-controls="navbar-search"
          >
            <Search className="w-4 h-4" />
          </Button>

          {/* Menu secondaire - regroupe les actions */}
          <div className="relative">
            <Button
              ref={secondaryMenuButtonRef}
              variant="ghost"
              size="sm"
              onClick={toggleSecondaryMenu}
              className="p-2 text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm rounded-full"
              aria-label="Menu secondaire"
              aria-expanded={state.secondaryMenuOpen}
              aria-controls="navbar-secondary-menu"
            >
              <MoreVertical className="w-4 h-4" />
            </Button>

            {/* Menu secondaire déroulant */}
            {state.secondaryMenuOpen && (
              <div 
                id="navbar-secondary-menu"
                role="menu"
                className="absolute right-0 top-full mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/60 py-2 z-50"
              >
                {/* Mode sombre */}
                <button
                  role="menuitem"
                  onClick={toggleDarkMode}
                  className="w-full px-4 py-2 text-left text-sm text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm flex items-center gap-2"
                >
                  {state.darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  {state.darkMode ? "Mode clair" : "Mode sombre"}
                </button>

                {/* Notifications */}
                <button
                  role="menuitem"
                  onClick={() => dispatch({ type: 'CLOSE_ALL' })}
                  className="w-full px-4 py-2 text-left text-sm text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm flex items-center gap-2"
                >
                  <Bell className="w-4 h-4" />
                  Notifications
                </button>

                {/* Support WhatsApp */}
                {import.meta.env.VITE_MOSALA_WHATSAPP && (
                  <a
                    role="menuitem"
                    href={`https://wa.me/${import.meta.env.VITE_MOSALA_WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full px-4 py-2 text-left text-sm text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Support WhatsApp
                  </a>
                )}

                <div className="border-t border-white/40 my-1"></div>

                {/* Actions utilisateur */}
                {isAuthenticated() ? (
                  <>
                    <Link
                      role="menuitem"
                      to="/profile"
                      onClick={() => dispatch({ type: 'CLOSE_ALL' })}
                      className="w-full px-4 py-2 text-left text-sm text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Mon profil
                    </Link>
                    <button
                      role="menuitem"
                      onClick={() => {
                        handleLogout();
                        dispatch({ type: 'CLOSE_ALL' });
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50/80 hover:backdrop-blur-sm flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Se déconnecter
                    </button>
                  </>
                ) : (
                  <Link
                    role="menuitem"
                    to="/login"
                    onClick={() => dispatch({ type: 'CLOSE_ALL' })}
                    className="w-full px-4 py-2 text-left text-sm text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Se connecter
                  </Link>
                )}
              </div>
            )}
          </div>

          {/* Menu mobile */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMenu}
            className="md:hidden p-2 text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm rounded-full"
            aria-label="Menu mobile"
          >
            {state.menuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </Button>
        </div>

        {/* Barre de recherche - simplifiée */}
        {state.searchOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/60 p-4 z-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher..."
                value={state.searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-white/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#BFFF00] focus:border-transparent bg-white/80 backdrop-blur-sm"
                autoFocus
              />
            </div>
            {suggestions.length > 0 && (
              <div className="mt-2 space-y-1">
                {suggestions.map((suggestion, index) => (
                  <Link
                    key={index}
                    to={suggestion.to}
                    onClick={() => {
                      setSearchOpen(false);
                      setSearchValue("");
                    }}
                    className="block px-3 py-2 text-sm text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm rounded-md"
                  >
                    {suggestion.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Menu mobile */}
        {state.menuOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl border border-white/60 py-2 z-50 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => dispatch({ type: 'CLOSE_ALL' })}
                className="block px-4 py-2 text-sm text-mosala-green hover:bg-white/40 hover:backdrop-blur-sm"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
