import React, { createContext, useContext, useState, useEffect } from 'react';

interface NavbarContextType {
  navbarHeight: number;
  setNavbarHeight: (height: number) => void;
  isScrolled: boolean;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const useNavbar = () => {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error('useNavbar must be used within a NavbarProvider');
  }
  return context;
};

interface NavbarProviderProps {
  children: React.ReactNode;
}

export const NavbarProvider: React.FC<NavbarProviderProps> = ({ children }) => {
  const [navbarHeight, setNavbarHeight] = useState(80); // Hauteur par défaut
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mettre à jour la variable CSS pour la hauteur de la navbar
  useEffect(() => {
    document.documentElement.style.setProperty('--nav-h', `${navbarHeight}px`);
  }, [navbarHeight]);

  const value = {
    navbarHeight,
    setNavbarHeight,
    isScrolled,
  };

  return (
    <NavbarContext.Provider value={value}>
      {children}
    </NavbarContext.Provider>
  );
};
