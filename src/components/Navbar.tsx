import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
    setIsOpen(false);
  };

  const handleContactClick = (e) => {
    e.preventDefault();
    if (window.location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" onClick={() => handleNavigation('/')} className="flex items-center">
              <img 
                src="https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=64&h=64&fit=crop&crop=faces"
                alt="Stanford Soccer"
                className="h-8 w-8 rounded-full"
              />
              <span className="ml-2 text-xl font-bold text-cardinal-red">Stanford Soccer Training</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" onClick={() => handleNavigation('/')} className="text-gray-700 hover:text-cardinal-red">Home</Link>
            <Link to="/staff" onClick={() => handleNavigation('/staff')} className="text-gray-700 hover:text-cardinal-red">Staff</Link>
            <Link to="/services" onClick={() => handleNavigation('/services')} className="text-gray-700 hover:text-cardinal-red">Services</Link>
            <a href="#contact" onClick={handleContactClick} className="text-gray-700 hover:text-cardinal-red">Contact</a>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={() => handleNavigation('/')} className="block px-3 py-2 text-gray-700 hover:text-cardinal-red">Home</Link>
            <Link to="/staff" onClick={() => handleNavigation('/staff')} className="block px-3 py-2 text-gray-700 hover:text-cardinal-red">Staff</Link>
            <Link to="/services" onClick={() => handleNavigation('/services')} className="block px-3 py-2 text-gray-700 hover:text-cardinal-red">Services</Link>
            <a href="#contact" onClick={handleContactClick} className="block px-3 py-2 text-gray-700 hover:text-cardinal-red">Contact</a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;