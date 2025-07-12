import { useState, useEffect, useCallback } from 'react';

interface SearchSuggestion {
  label: string;
  to: string;
  type?: 'page' | 'service' | 'job' | 'candidate';
}

interface UseSearchOptions {
  debounceDelay?: number;
  maxSuggestions?: number;
}

export const useSearch = (options: UseSearchOptions = {}) => {
  const { debounceDelay = 300, maxSuggestions = 10 } = options;
  
  const [searchValue, setSearchValue] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Debounce pour éviter trop de requêtes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, debounceDelay);

    return () => clearTimeout(timer);
  }, [searchValue, debounceDelay]);

  // Suggestions statiques (à remplacer par une vraie API)
  const staticSuggestions: SearchSuggestion[] = [
    { label: "Services Mosala", to: "/services", type: "service" },
    { label: "Formations", to: "/formations", type: "service" },
    { label: "Candidats", to: "/candidates", type: "candidate" },
    { label: "Emplois", to: "/jobs", type: "job" },
    { label: "Mon profil", to: "/profile", type: "page" },
    { label: "Accompagnement", to: "/services#accompagnement", type: "service" },
    { label: "Formation continue", to: "/formations#continue", type: "service" },
    { label: "Offres d'emploi", to: "/jobs", type: "job" },
    { label: "CV Builder", to: "/cv-builder", type: "service" },
    { label: "Conseils carrière", to: "/services#conseils", type: "service" },
  ];

  // Recherche des suggestions
  useEffect(() => {
    if (!debouncedValue.trim()) {
      setSuggestions([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    
    // Simulation d'une recherche API
    const searchSuggestions = () => {
      const filtered = staticSuggestions
        .filter(s => 
          s.label.toLowerCase().includes(debouncedValue.toLowerCase()) ||
          s.to.toLowerCase().includes(debouncedValue.toLowerCase())
        )
        .slice(0, maxSuggestions);
      
      setSuggestions(filtered);
      setIsLoading(false);
    };

    // Simuler un délai réseau
    const timer = setTimeout(searchSuggestions, 200);
    return () => clearTimeout(timer);
  }, [debouncedValue, maxSuggestions]);

  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
    setIsOpen(true);
  }, []);

  const handleSuggestionClick = useCallback((suggestion: SearchSuggestion) => {
    setSearchValue('');
    setIsOpen(false);
    setSuggestions([]);
    // Navigation sera gérée par le composant parent
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearchValue('');
    setSuggestions([]);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  // Gestion des raccourcis clavier
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  return {
    searchValue,
    debouncedValue,
    suggestions,
    isLoading,
    isOpen,
    handleSearchChange,
    handleSuggestionClick,
    handleClose,
    setIsOpen,
  };
}; 