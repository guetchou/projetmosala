import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Briefcase, Users, BookOpen, MessageCircle } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { href: "/", label: "Accueil", icon: null },
    { href: "/jobs", label: "Emplois & Formations", icon: Briefcase },
    { href: "/about", label: "À propos", icon: Users },
    { href: "/blog", label: "Blog", icon: BookOpen },
    { href: "/contact", label: "Contact", icon: MessageCircle },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="/lovable-uploads/1a173991-3aff-4b03-90e4-b87e9603efd0.png" 
              alt="MOSALA" 
              className="h-10 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-mosala-dark hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              Connexion
            </Button>
            <Button className="bg-gradient-primary hover:opacity-90 text-white">
              S'inscrire
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md hover:bg-muted"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center space-x-2 text-mosala-dark hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.icon && <item.icon size={18} />}
                  <span>{item.label}</span>
                </a>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
                  Connexion
                </Button>
                <Button className="bg-gradient-primary hover:opacity-90 text-white">
                  S'inscrire
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;