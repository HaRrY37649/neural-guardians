
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Shield, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'bg-white/80 dark:bg-neural-dark/80 backdrop-blur-lg shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-neural-primary text-white overflow-hidden">
            <Shield className="w-6 h-6" />
            <div className="absolute inset-0 bg-gradient-to-tr from-neural-primary via-neural-secondary to-neural-accent opacity-70" />
          </div>
          <span className="text-xl font-semibold tracking-tight text-foreground">
            Neural<span className="text-neural-primary">Guard</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-neural-primary transition-colors">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-neural-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/pricing" className="text-sm font-medium hover:text-neural-primary transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/login">Log In</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>

        <button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-md"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 bg-white/90 dark:bg-neural-dark/90 backdrop-blur-lg z-40 flex flex-col md:hidden pt-24 px-6 transition-transform duration-300 ease-in-out',
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <nav className="flex flex-col space-y-6">
          <Link
            to="/"
            className="text-lg font-medium hover:text-neural-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-lg font-medium hover:text-neural-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/pricing"
            className="text-lg font-medium hover:text-neural-primary transition-colors"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Pricing
          </Link>
        </nav>

        <div className="mt-10 flex flex-col space-y-4">
          <Button variant="outline" size="lg" className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/login">Log In</Link>
          </Button>
          <Button size="lg" className="w-full" asChild onClick={() => setIsMobileMenuOpen(false)}>
            <Link to="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
