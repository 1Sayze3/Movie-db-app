import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50 shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">MovieDB</Link>

        
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-300">Home</Link>
          <Link to="/about" className="hover:text-gray-300">About Us</Link>
        </div>
        
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none transition-transform duration-200"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="bg-gray-800 rounded-lg shadow-md p-4">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              Home
            </Link>

            <hr className="my-2 border-gray-700" />

            <Link
              to="/about"
              onClick={() => setIsOpen(false)}
              className="block hover:bg-gray-700 px-3 py-2 rounded transition-colors"
            >
              About Us
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}