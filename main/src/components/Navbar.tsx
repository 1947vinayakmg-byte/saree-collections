import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Menu, X, Heart, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar: React.FC = () => {
  const { favorites } = useShop();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppChat = () => {
    const basePhone = '919876543210';
    const text = encodeURIComponent("Hello! I am browsing your Saree demo-web online and would like to ask a question.");
    window.open(`https://wa.me/${basePhone}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/94 backdrop-blur-md border-b border-stone-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo Brand Panel */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex flex-col text-left group">
              <span className="font-serif text-2xl font-bold tracking-[0.1em] text-stone-900 group-hover:text-burgundy-700 transition-colors uppercase leading-none">
                Zari
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] font-sans font-semibold text-gold-600 mt-1 pl-0.5">
                Silk demo-web
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8 lg:space-x-12">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-xs uppercase tracking-wider font-semibold font-sans transition-colors py-2 border-b-2 ${isActive
                  ? 'text-burgundy-700 border-burgundy-700'
                  : 'text-stone-600 border-transparent hover:text-burgundy-700 hover:border-burgundy-300'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                `text-xs uppercase tracking-wider font-semibold font-sans transition-colors py-2 border-b-2 ${isActive
                  ? 'text-burgundy-700 border-burgundy-700'
                  : 'text-stone-600 border-transparent hover:text-burgundy-700 hover:border-burgundy-300'
                }`
              }
            >
              Collections
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-xs uppercase tracking-wider font-semibold font-sans transition-colors py-2 border-b-2 ${isActive
                  ? 'text-burgundy-700 border-burgundy-700'
                  : 'text-stone-600 border-transparent hover:text-burgundy-700 hover:border-burgundy-300'
                }`
              }
            >
              Our Story
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `text-xs uppercase tracking-wider font-semibold font-sans transition-colors py-2 border-b-2 ${isActive
                  ? 'text-burgundy-700 border-burgundy-700'
                  : 'text-stone-600 border-transparent hover:text-burgundy-700 hover:border-burgundy-300'
                }`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Desktop Right Side Panel Icons */}
          <div className="hidden md:flex items-center space-x-5">
            {/* Wishlist Status */}
            <Link
              to="/collections"
              className="relative p-2 text-stone-600 hover:text-burgundy-700 hover:scale-105 transition-all text-center"
              title="View Wishlist"
            >
              <Heart size={19} />
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-burgundy-600 text-white text-[9px] w-4.5 h-4.5 rounded-full flex items-center justify-center font-bold tracking-normal">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Standard WhatsApp button */}
            <button
              onClick={handleWhatsAppChat}
              className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-xs transition-all hover:shadow-md cursor-pointer"
            >
              <MessageCircle size={14} className="fill-white stroke-none" />
              WhatsApp Help
            </button>
          </div>

          {/* Mobile Right Icons & Hamburger button */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Quick Favorite */}
            <Link to="/collections" className="relative p-2 text-stone-600">
              <Heart size={18} />
              {favorites.length > 0 && (
                <span className="absolute top-0 right-0 bg-burgundy-600 text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {favorites.length}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-burgundy-700 focus:outline-none focus:ring-1 focus:ring-stone-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-stone-100 overflow-hidden shadow-inner font-sans"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 text-left">
              <NavLink
                to="/"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-semibold tracking-wide ${isActive ? 'bg-burgundy-50 text-burgundy-800' : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/collections"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-semibold tracking-wide ${isActive ? 'bg-burgundy-50 text-burgundy-800' : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                Our Saree Collections
              </NavLink>
              <NavLink
                to="/about"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-semibold tracking-wide ${isActive ? 'bg-burgundy-50 text-burgundy-800' : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                Our Story & Legacy
              </NavLink>
              <NavLink
                to="/contact"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-semibold tracking-wide ${isActive ? 'bg-burgundy-50 text-burgundy-800' : 'text-stone-700 hover:bg-stone-50'
                  }`
                }
              >
                Contact & Store Location
              </NavLink>

              {/* Mobile Quick Action button */}
              <div className="pt-4 px-4">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleWhatsAppChat();
                  }}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center py-3.5 px-4 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle size={15} className="fill-white stroke-none" />
                  WhatsApp Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
