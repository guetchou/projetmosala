import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../pages/About';

// Mock des composants externes
jest.mock('../components/Navbar', () => () => <div data-testid="navbar">Navbar</div>);
jest.mock('../components/Footer', () => () => <div data-testid="footer">Footer</div>);
jest.mock('../components/ui/OptimizedImage', () => ({ src, alt, className }: any) => (
  <img src={src} alt={alt} className={className} data-testid="optimized-image" />
));

// Mock de framer-motion
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    a: ({ children, ...props }: any) => <a {...props}>{children}</a>,
  },
  useReducedMotion: () => false,
}));

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('About Page', () => {
  beforeEach(() => {
    // Mock de document.querySelector pour les tests de données structurées
    document.querySelector = jest.fn().mockReturnValue(null);
    document.head.appendChild = jest.fn();
  });

  test('renders main sections', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('À propos de Mosala')).toBeInTheDocument();
    expect(screen.getByText('Notre mission')).toBeInTheDocument();
    expect(screen.getByText('Nos valeurs')).toBeInTheDocument();
    expect(screen.getByText("L'équipe Mosala")).toBeInTheDocument();
    expect(screen.getByText('Nos partenaires')).toBeInTheDocument();
    expect(screen.getByText('Nos engagements')).toBeInTheDocument();
  });

  test('renders team members with optimized images', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Jean Mosala')).toBeInTheDocument();
    expect(screen.getByText('Bertille NGUIE')).toBeInTheDocument();
    expect(screen.getByText('Marie-Claire ANGALA')).toBeInTheDocument();
    expect(screen.getByText('David ITOBA')).toBeInTheDocument();
    expect(screen.getByText('Jean-Pierre KIBANGOU')).toBeInTheDocument();
    
    // Vérifier que les images optimisées sont rendues
    const optimizedImages = screen.getAllByTestId('optimized-image');
    expect(optimizedImages.length).toBeGreaterThan(0);
  });

  test('renders partner links with proper attributes', () => {
    renderWithRouter(<About />);
    
    const partnerLinks = screen.getAllByRole('link');
    const afdLink = partnerLinks.find(link => link.getAttribute('href') === 'https://www.afd.fr');
    const euLink = partnerLinks.find(link => link.getAttribute('href') === 'https://europa.eu');
    
    expect(afdLink).toHaveAttribute('target', '_blank');
    expect(afdLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(euLink).toHaveAttribute('target', '_blank');
    expect(euLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders values with proper accessibility', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText('Inclusion')).toBeInTheDocument();
    expect(screen.getByText('Excellence')).toBeInTheDocument();
    expect(screen.getByText('Sécurité & RGPD')).toBeInTheDocument();
    expect(screen.getByText('Ouverture')).toBeInTheDocument();
    expect(screen.getByText('Transparence')).toBeInTheDocument();
  });

  test('renders mission details', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText(/Caravane itinérante dans 6 villes/)).toBeInTheDocument();
    expect(screen.getByText(/Formations certifiantes et coaching/)).toBeInTheDocument();
    expect(screen.getByText(/Plateforme digitale accessible et sécurisée/)).toBeInTheDocument();
    expect(screen.getByText(/Accompagnement à l'entrepreneuriat/)).toBeInTheDocument();
  });

  test('renders engagement commitments', () => {
    renderWithRouter(<About />);
    
    expect(screen.getByText(/Accessibilité numérique \(WCAG 2\.1 AA\)/)).toBeInTheDocument();
    expect(screen.getByText(/Protection des données \(conformité RGPD\)/)).toBeInTheDocument();
    expect(screen.getByText(/Égalité des chances et lutte contre les discriminations/)).toBeInTheDocument();
    expect(screen.getByText(/Transparence sur l'utilisation des données/)).toBeInTheDocument();
    expect(screen.getByText(/Accompagnement humain et digital/)).toBeInTheDocument();
  });

  test('injects structured data', () => {
    renderWithRouter(<About />);
    
    // Vérifier que le script de données structurées est injecté
    expect(document.head.appendChild).toHaveBeenCalled();
  });

  test('has proper semantic structure', () => {
    renderWithRouter(<About />);
    
    // Vérifier la hiérarchie des titres
    const h1 = screen.getByRole('heading', { level: 1 });
    const h2s = screen.getAllByRole('heading', { level: 2 });
    
    expect(h1).toHaveTextContent('À propos de Mosala');
    expect(h2s).toHaveLength(5); // Mission, Valeurs, Équipe, Partenaires, Engagements
  });
}); 