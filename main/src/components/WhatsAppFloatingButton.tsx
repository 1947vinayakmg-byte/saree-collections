import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const [showTip, setShowTip] = React.useState(false);

  useEffect(() => {
    // Show premium suggestion tooltip after 3 seconds
    const timer = setTimeout(() => {
      setShowTip(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleWhatsAppClick = () => {
    const basePhone = '919876543210';
    const initialText = encodeURIComponent(
      "Hello Zari demo-web! 🌸 I am browsing your lovely saree collection online. Could you help me with customized silk designs or wedding collections?"
    );
    window.open(`https://wa.me/${basePhone}?text=${initialText}`, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            className="mb-3 max-w-xs bg-white text-stone-800 p-3 rounded-2xl shadow-xl border border-stone-100 relative flex items-start gap-2 select-none"
          >
            <div className="flex-1 text-xs leading-relaxed font-sans">
              <span className="font-semibold block text-burgundy-700 font-serif mb-0.5">🌸 Custom Stitching Available!</span>
              Have questions about borders, blouse tailoring, or physical store trials? Direct message us on WhatsApp!
            </div>
            <button
              onClick={() => setShowTip(false)}
              className="text-stone-400 hover:text-stone-600 transition-colors p-0.5"
            >
              <X size={14} />
            </button>
            {/* Elegant little target pointer */}
            <div className="absolute right-6 -bottom-1.5 w-3 h-3 bg-white rotate-45 border-r border-b border-stone-100" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={handleWhatsAppClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center relative group"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute right-full mr-3 bg-stone-900 text-white text-xs px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md font-sans">
          WhatsApp Designer
        </span>
        {/* Pulsing ring */}
        <span className="absolute inset-0 rounded-full border-4 border-emerald-500/30 animate-ping -z-10" />
        <MessageCircle size={26} className="fill-white stroke-none" />
      </motion.button>
    </div>
  );
};

// Add helper import for useEffect inside the component
import { useEffect } from 'react';
export default WhatsAppFloatingButton;
