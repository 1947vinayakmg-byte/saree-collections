import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/mockSarees';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const CategorySection: React.FC = () => {
  const { setFilters } = useShop();
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    setFilters(prev => ({ ...prev, category: categoryId }));
    navigate('/collections');
  };

  return (
    <section className="py-20 bg-stone-50 border-t border-b border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-burgundy-700 text-xs font-bold uppercase tracking-widest font-sans">
            Heritage Silks & Organics
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-2 font-medium">
            Explore Weaving Genres
          </h2>
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mt-4" />
          <p className="text-sm text-stone-500 font-sans mt-4 leading-relaxed">
            From the heavy gold metallic patterns of Banarasi loom to the ultra light breeze of handloom floral organic organza, browse by authentic saree categories.
          </p>
        </div>

        {/* Categories Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              onClick={() => handleCategoryClick(category.id)}
              className="group relative h-[380px] rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-500 cursor-pointer border border-stone-200/40"
            >
              {/* Background cover image */}
              <img
                src={category.image}
                alt={category.displayName}
                referrerPolicy="no-referrer"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-700 ease-out"
              />
              
              {/* Darkening gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-stone-950 via-stone-950/40 to-stone-950/20 group-hover:from-burgundy-950/90 transition-all duration-300" />

              {/* Inner golden frame */}
              <div className="absolute inset-4 border border-gold-400/20 rounded-xl pointer-events-none group-hover:border-gold-300/40 transition-colors" />

              {/* Typography info */}
              <div className="absolute inset-x-0 bottom-0 p-6 flex flex-col justify-end h-[60%] text-left z-10">
                <h3 className="font-serif text-xl font-bold text-white mb-2 tracking-wide block">
                  {category.displayName}
                </h3>
                
                <p className="text-stone-300 text-xs font-sans leading-relaxed mb-4 line-clamp-2 select-none">
                  {category.description}
                </p>

                <div className="inline-flex items-center gap-1.5 text-xs text-gold-300 group-hover:text-gold-200 font-sans font-bold uppercase tracking-wider group-hover:underline">
                  Browse Collection
                  <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
export default CategorySection;
