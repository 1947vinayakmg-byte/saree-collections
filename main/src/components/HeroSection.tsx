import React from 'react';
import { motion } from 'motion/react';
import heroSareeModel from '../assets/images/hero_saree_model_1779684897918.png';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[85vh] flex items-center bg-stone-50 overflow-hidden">
      {/* Absolute background decoration elements */}
      <div className="absolute top-0 right-0 w-[50%] h-full bg-linear-to-l from-gold-50/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-burgundy-50/40 mix-blend-multiply filter blur-2xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text panel */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-burgundy-50 border border-burgundy-100 rounded-full text-burgundy-800 text-xs font-semibold tracking-wider uppercase mb-6 self-start font-sans"
            >
              <Sparkles size={11} className="text-gold-500 fill-gold-500" />
              Saree Weavers of Royal Heritage
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-serif text-stone-900 leading-[1.1] mb-6 font-medium"
            >
              Pure Silks. <br />
              <span className="text-burgundy-700 font-serif italic">Elegant Zari.</span> <br />
              Eternal Heritage.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-lg mb-10 font-sans"
            >
              Hand-guided master drapes engineered by award-winning artisans. Experience Kanjeevaram silken crowns and sheer Banarasi gold vines curated for grand wedding events and custom tailoring.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={() => navigate('/collections')}
                className="bg-burgundy-700 hover:bg-stone-950 text-white font-sans font-bold py-4 px-8 rounded-xl tracking-wider uppercase text-xs flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                Browse Treasures
                <ArrowRight size={14} />
              </button>
              
              <button
                onClick={() => navigate('/about')}
                className="bg-transparent border border-stone-300 hover:border-burgundy-700 text-stone-700 hover:text-burgundy-950 font-sans font-semibold py-4 px-8 rounded-xl text-xs tracking-wider uppercase flex items-center justify-center transition-all cursor-pointer"
              >
                Our Weaving Legacy
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="grid grid-cols-3 gap-6 mt-14 pt-8 border-t border-stone-200/60 max-w-md select-none"
            >
              <div>
                <span className="block font-serif text-2xl font-bold text-burgundy-800">100%</span>
                <span className="text-xs text-stone-500 font-sans">Pure Handloom Silk</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-burgundy-800">12k+</span>
                <span className="text-xs text-stone-500 font-sans">Drapes Hand-curated</span>
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-burgundy-800">Custom</span>
                <span className="text-xs text-stone-500 font-sans">Blouse Stitching</span>
              </div>
            </motion.div>
          </div>

          {/* Hero graphic / model photography poster panel */}
          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-lg aspect-3/4 rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-100"
            >
              <img
                src={heroSareeModel}
                alt="Finest Crimson Banarasi Gold Saree presentation model"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-102 transition-transform duration-700"
              />
              
              {/* Overlay golden border detailing */}
              <div className="absolute inset-4 border border-gold-300/30 rounded-2xl pointer-events-none z-10" />

              {/* Floating review summary card */}
              <motion.div
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute bottom-6 left-6 right-6 bg-white/94 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/40 flex items-center gap-3.5 z-20 pointer-events-none"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden bg-stone-100 shrink-0">
                  <img 
                    src="https://picsum.photos/seed/anjali/100/100" 
                    alt="Review avatar" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex gap-0.5 text-amber-500 text-xs mb-0.5">
                    ★ ★ ★ ★ ★
                  </div>
                  <p className="text-stone-700 text-[11px] leading-relaxed line-clamp-2 italic font-sans">
                    &quot;The shimmer of the pure gold zari on this red Banarasi was magical representing absolute royal pride...&quot;
                  </p>
                  <span className="text-[10px] text-stone-400 block font-semibold mt-1 font-sans">— Anjali S., Bridal Customer</span>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
