import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import Navbar from './Navbar';

// Mock des hooks et utilitaires
vi.mock('@/utils/auth', () => ({
  isAuthenticated: vi.fn(() => false),
  logout: vi.fn(),
  getUserRole: vi.fn(() => 'candidat'),
}));

vi.mock('@/hooks/useUser', () => ({
  useUser: vi.fn(() => ({ user: null })),
}));

// Mock de localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock de matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe('Navbar Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders logo and navigation links', () => {
    renderNavbar();
    
    expect(screen.getByAltText('Logo Mosala')).toBeInTheDocument();
    expect(screen.getByText('Accueil')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Formations')).toBeInTheDocument();
    expect(screen.getByText('Candidats')).toBeInTheDocument();
    expect(screen.getByText('Emplois')).toBeInTheDocument();
  });

  test('renders search button', () => {
    renderNavbar();
    
    const searchButton = screen.getByLabelText('Recherche globale');
    expect(searchButton).toBeInTheDocument();
  });

  test('renders dark mode toggle', () => {
    renderNavbar();
    
    const darkModeButton = screen.getByLabelText('Activer le mode sombre');
    expect(darkModeButton).toBeInTheDocument();
  });

  test('renders login button when not authenticated', () => {
    renderNavbar();
    
    const loginButton = screen.getByLabelText('Connexion Mosala');
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toHaveTextContent('Connexion');
  });

  test('opens search overlay when search button is clicked', async () => {
    renderNavbar();
    
    const searchButton = screen.getByLabelText('Recherche globale');
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Recherche Mosala')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Rechercher sur Mosala...')).toBeInTheDocument();
    });
  });

  test('closes search overlay when clicking outside', async () => {
    renderNavbar();
    
    const searchButton = screen.getByLabelText('Recherche globale');
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      expect(screen.getByLabelText('Recherche Mosala')).toBeInTheDocument();
    });
    
    // Click outside the search overlay
    fireEvent.click(document.body);
    
    await waitFor(() => {
      expect(screen.queryByLabelText('Recherche Mosala')).not.toBeInTheDocument();
    });
  });

  test('toggles dark mode when dark mode button is clicked', () => {
    renderNavbar();
    
    const darkModeButton = screen.getByLabelText('Activer le mode sombre');
    fireEvent.click(darkModeButton);
    
    expect(localStorageMock.setItem).toHaveBeenCalledWith('mosala-theme', 'dark');
  });

  test('shows mobile menu when burger button is clicked', () => {
    renderNavbar();
    
    const burgerButton = screen.getByLabelText('Menu');
    fireEvent.click(burgerButton);
    
    // Vérifier que le menu mobile est visible
    expect(screen.getByText('Accueil')).toBeInTheDocument();
  });

  test('has proper accessibility attributes', () => {
    renderNavbar();
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Navigation principale Mosala');
    
    const searchButton = screen.getByLabelText('Recherche globale');
    expect(searchButton).toHaveAttribute('tabIndex', '0');
  });

  test('handles keyboard navigation', () => {
    renderNavbar();
    
    const searchButton = screen.getByLabelText('Recherche globale');
    searchButton.focus();
    
    // Test Tab navigation
    fireEvent.keyDown(searchButton, { key: 'Tab' });
    expect(searchButton).not.toHaveFocus();
  });

  test('debounces search input', async () => {
    renderNavbar();
    
    const searchButton = screen.getByLabelText('Recherche globale');
    fireEvent.click(searchButton);
    
    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Rechercher sur Mosala...');
      expect(searchInput).toBeInTheDocument();
      
      // Type in search input
      fireEvent.change(searchInput, { target: { value: 'test' } });
      
      // Should not immediately show suggestions due to debounce
      expect(screen.queryByText('Services Mosala')).not.toBeInTheDocument();
    });
  });
}); 