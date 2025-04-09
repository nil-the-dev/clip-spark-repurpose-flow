
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from './Logo';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/dashboard" className="text-gray-700 hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/workflow" className="text-gray-700 hover:text-primary transition-colors">
              Workflows
            </Link>
            <Link to="/connections" className="text-gray-700 hover:text-primary transition-colors">
              Connections
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-primary transition-colors">
              Pricing
            </Link>

            <div className="flex items-center space-x-3">
              <Button variant="outline" asChild>
                <Link to="/auth">Log In</Link>
              </Button>
              <Button className="gradient-bg" asChild>
                <Link to="/auth?tab=signup">Sign Up</Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn(
        "md:hidden fixed inset-0 top-16 bg-white z-40 transform transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="px-4 pt-2 pb-5 space-y-4">
          <Link 
            to="/dashboard" 
            className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link 
            to="/workflow" 
            className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Workflows
          </Link>
          <Link 
            to="/connections" 
            className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Connections
          </Link>
          <Link 
            to="/pricing" 
            className="block py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-100 rounded-md"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <div className="pt-4 space-y-3">
            <Button variant="outline" className="w-full" asChild>
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>Log In</Link>
            </Button>
            <Button className="w-full gradient-bg" asChild>
              <Link to="/auth?tab=signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
