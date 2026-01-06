import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Phone, ShoppingCart, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-amber-400">Liquor Ghar</h1>
            <span className="ml-2 text-xs bg-amber-400 text-gray-900 px-2 py-1 rounded-full font-semibold">24/7</span>
          </div>

           {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/welcome" className="hover:text-amber-400 transition">Welcome</Link>
            <Link to="/about" className="hover:text-amber-400 transition">About Us</Link>
            <Link to="/register" className="hover:text-amber-400 transition">Register</Link>
            <Link to="/login" className="hover:text-amber-400 transition">Login</Link>
           </div>

          {/* Right Side Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-sm">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>24 Hours</span>
            </div>
            <button className="flex items-center space-x-2 bg-amber-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-amber-500 transition font-semibold">
              <Phone className="w-4 h-4" />
              <span>Order Now</span>
            </button>
            <button className="relative p-2 hover:bg-gray-800 rounded-lg transition">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-xs w-5 h-5 flex items-center justify-center rounded-full">0</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link to="/welcome" className="block py-2 hover:text-amber-400 transition">Welcome</Link>
            <Link to="/about" className="block py-2 hover:text-amber-400 transition">About Us</Link>
            <Link to="/register" className="block py-2 hover:text-amber-400 transition">Register</Link>
            <Link to="/login" className="block py-2 hover:text-amber-400 transition">Login</Link>
            <button className="w-full flex items-center justify-center space-x-2 bg-amber-400 text-gray-900 px-4 py-3 rounded-lg hover:bg-amber-500 transition font-semibold mt-4">
              <Phone className="w-4 h-4" />
              <span>Order Now</span>
            </button>
             
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;