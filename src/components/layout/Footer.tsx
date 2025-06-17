import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin } from 'lucide-react'; // Example social icons

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="text-xl font-bold text-blue-600">
              CoolContent
            </Link>
            <p className="text-sm text-gray-500 mt-2">
              Discover and share amazing content.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/browse" className="text-sm text-gray-600 hover:text-blue-600">Browse</Link></li>
              <li><Link to="/submit" className="text-sm text-gray-600 hover:text-blue-600">Submit</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-blue-600">FAQ</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Follow Us */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">Twitter</span><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">GitHub</span><Github className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-gray-500"><span className="sr-only">LinkedIn</span><Linkedin className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} CoolContent. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;