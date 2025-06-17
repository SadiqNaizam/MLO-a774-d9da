import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, Search, UserCircle2, PlusCircle } from 'lucide-react'; // Example icons

interface NavLink {
  href: string;
  label: string;
}

const navLinks: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Browse' },
  // Add more links as needed, e.g., Categories, About
];

const NavigationMenu: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu, mobile open:", isMobileMenuOpen);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand Name */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
              CoolContent
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link to="/submit">
                <PlusCircle className="mr-2 h-4 w-4" /> Submit
              </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile" aria-label="User Profile">
                <UserCircle2 className="h-5 w-5" />
              </Link>
            </Button>
            {/* Optional: Search button triggering a modal or search bar */}
            {/* <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button> */}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <Button onClick={toggleMobileMenu} variant="ghost" size="icon" aria-label="Open main menu">
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-40 bg-white shadow-lg p-4">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <hr className="my-2"/>
            <Button variant="outline" className="w-full" asChild>
              <Link to="/submit" onClick={() => setIsMobileMenuOpen(false)}>
                 <PlusCircle className="mr-2 h-4 w-4" /> Submit Content
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start text-gray-700" asChild>
              <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                <UserCircle2 className="mr-2 h-4 w-4" /> Profile
              </Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationMenu;