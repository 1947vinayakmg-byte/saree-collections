import React from 'react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/mockSarees';
import { SlidersHorizontal, RefreshCw } from 'lucide-react';

export const Filters: React.FC = () => {
  const { filters, setFilters } = useShop();

  const handleCategorySelect = (categoryId: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category === categoryId ? 'all' : categoryId
    }));
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setFilters(prev => ({ ...prev, priceRange: value }));
  };

  const handleReset = () => {
    setFilters({
      search: '',
      category: 'all',
      priceRange: 60000
    });
  };

  const currentCategoryLabel = filters.category === 'all' 
    ? 'All Categories' 
    : CATEGORIES.find(c => c.id === filters.category)?.displayName || filters.category;

  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-stone-100 pb-4 mb-5">
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={18} className="text-gold-600" />
          <h3 className="text-md font-serif font-semibold text-stone-800">Filter Collections</h3>
        </div>
        
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 text-xs text-stone-500 hover:text-burgundy-700 font-sans transition-colors cursor-pointer"
        >
          <RefreshCw size={12} />
          Reset Filters
        </button>
      </div>

      {/* Category Section */}
      <div className="mb-6">
        <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-3 font-sans">
          Select Weave & Style
        </h4>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilters(prev => ({ ...prev, category: 'all' }))}
            className={`px-3 py-1.5 rounded-full text-xs font-medium font-sans border transition-all cursor-pointer ${
              filters.category === 'all'
                ? 'bg-burgundy-700 text-white border-burgundy-700 shadow-xs'
                : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300'
            }`}
          >
            All Weaves
          </button>
          
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium font-sans border transition-all cursor-pointer ${
                filters.category === category.id
                  ? 'bg-burgundy-700 text-white border-burgundy-700 shadow-xs'
                  : 'bg-stone-50 text-stone-600 border-stone-200 hover:border-stone-300'
              }`}
            >
              {category.displayName}
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter Section */}
      <div>
        <div className="flex items-center justify-between text-xs uppercase tracking-wider font-semibold text-stone-400 mb-3 font-sans">
          <span>Max Price</span>
          <span className="text-stone-800 font-semibold font-mono tracking-normal">
            ₹{filters.priceRange.toLocaleString('en-IN')}
          </span>
        </div>
        <div className="relative mt-2">
          <input
            type="range"
            min="5000"
            max="60000"
            step="1000"
            value={filters.priceRange}
            onChange={handlePriceChange}
            className="w-full h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-burgundy-600 focus:outline-none"
          />
          <div className="flex justify-between text-[10px] text-stone-400 font-mono mt-2 select-none">
            <span>₹5,000</span>
            <span>₹30,000</span>
            <span>₹60,000+</span>
          </div>
        </div>
      </div>

      {/* Small informative summary count */}
      <div className="mt-5 pt-4 border-t border-stone-50 text-[11px] text-stone-400 font-sans italic text-center">
        Currently searching in: {currentCategoryLabel} up to ₹{filters.priceRange.toLocaleString('en-IN')}
      </div>
    </div>
  );
};
