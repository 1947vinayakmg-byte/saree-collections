import React from 'react';
import { SearchBar } from '../components/SearchBar';
import { Filters } from '../components/Filters';
import { ProductGrid } from '../components/ProductGrid';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/mockSarees';
import { SlidersHorizontal, Grid, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Collections: React.FC = () => {
  const { filters, setFilters } = useShop();
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  const selectedCategoryMeta = CATEGORIES.find(c => c.id === filters.category);

  return (
    <div className="bg-stone-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Collection Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-burgundy-700 text-xs font-bold uppercase tracking-widest font-sans">
            Curated Vaults
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 mt-2 font-medium">
            Treasures of Handloom
          </h1>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4 mb-6" />
          
          <AnimatePresence mode="wait">
            {selectedCategoryMeta ? (
              <motion.div
                key={selectedCategoryMeta.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="bg-burgundy-50 border border-burgundy-100 p-4 rounded-xl text-left max-w-xl mx-auto font-sans"
              >
                <span className="font-serif text-xs font-bold text-burgundy-800 uppercase block mb-1">
                  💡 {selectedCategoryMeta.displayName} Style Note
                </span>
                <p className="text-[12px] text-stone-600 leading-relaxed">
                  {selectedCategoryMeta.description}
                </p>
              </motion.div>
            ) : (
              <p className="text-stone-500 font-sans text-sm leading-relaxed max-w-xl mx-auto">
                Discover heavy zari, light drapery, sheer translucent patterns, and certified silk hallmark weaves. Refine by category or price to find your perfect fit.
              </p>
            )}
          </AnimatePresence>
        </div>

        {/* Dynamic Search Container Section */}
        <div className="mb-10">
          <SearchBar />
        </div>

        {/* Mobile Filter toggle bars */}
        <div className="flex md:hidden items-center justify-between gap-4 mb-6">
          <button
            onClick={() => setShowMobileFilters(true)}
            className="flex items-center gap-2 bg-stone-900 text-white px-4 py-2.5 rounded-xl font-sans text-xs font-bold uppercase tracking-wider"
          >
            <SlidersHorizontal size={14} />
            Show Filters
          </button>
          
          <span className="text-xs text-stone-500 font-sans font-medium">
            Sorted: Curated Favorites First
          </span>
        </div>

        {/* 2-Column Desktop Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Desktop Filters Panel */}
          <aside className="hidden md:block md:col-span-4 lg:col-span-3 sticky top-28">
            <Filters />
          </aside>

          {/* Right Column: Saree Grid display */}
          <main className="md:col-span-8 lg:col-span-9">
            <ProductGrid />
          </main>

        </div>

      </div>

      {/* Mobile Filters Overlay drawer model */}
      <AnimatePresence>
        {showMobileFilters && (
          <div className="fixed inset-0 z-50 md:hidden flex justify-end">
            
            {/* Backdrop element */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileFilters(false)}
              className="absolute inset-0 bg-black"
            />

            {/* Content Sidebar Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="relative w-full max-w-sm bg-white h-full shadow-2xl flex flex-col p-6 z-10 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-100">
                <span className="font-serif font-bold text-stone-850">Refine Sarees</span>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="p-1.5 hover:bg-stone-50 text-stone-400 rounded-full"
                >
                  <X size={18} />
                </button>
              </div>

              <Filters />

              <button
                onClick={() => setShowMobileFilters(false)}
                className="mt-8 w-full bg-burgundy-700 hover:bg-burgundy-850 font-sans font-bold text-xs uppercase tracking-wider text-white py-3.5 rounded-xl flex items-center justify-center gap-1 shadow-md"
              >
                Apply Filters & See Results
              </button>
            </motion.div>

          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default Collections;
