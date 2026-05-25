import React from 'react';
import { Search, X } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchBar: React.FC = () => {
  const { filters, setFilters } = useShop();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, search: e.target.value }));
  };

  const handleClear = () => {
    setFilters(prev => ({ ...prev, search: '' }));
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative flex items-center bg-white rounded-full border border-stone-200 focus-within:border-gold-500 focus-within:ring-1 focus-within:ring-gold-500/20 overflow-hidden shadow-sm transition-all">
        <div className="pl-4 text-stone-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          value={filters.search}
          onChange={handleSearchChange}
          placeholder="Search sarees by name, fabric, weavers..."
          className="w-full py-3.5 px-3 bg-transparent text-sm focus:outline-none text-stone-800 placeholder-stone-400 font-sans"
        />
        {filters.search && (
          <button
            onClick={handleClear}
            className="p-1 mr-2 text-stone-400 hover:text-stone-600 rounded-full hover:bg-stone-100 transition-all"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};
