import React from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { Info, ShoppingBag } from 'lucide-react';

interface ProductGridProps {
  limit?: number;
  featuredOnly?: boolean;
  categoryFilter?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ 
  limit, 
  featuredOnly = false,
  categoryFilter
}) => {
  const { sarees, filters } = useShop();

  // Apply filters
  let filteredSarees = sarees.filter(saree => {
    // Search query filter
    const matchesSearch = filters.search
      ? saree.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        saree.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        saree.fabric.toLowerCase().includes(filters.search.toLowerCase()) ||
        saree.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        saree.craftsmanship.toLowerCase().includes(filters.search.toLowerCase())
      : true;

    // Category filter
    const targetCategory = categoryFilter || filters.category;
    const matchesCategory = targetCategory === 'all' || !targetCategory
      ? true
      : saree.category === targetCategory;

    // Price range filter
    const matchesPrice = saree.price <= filters.priceRange;

    return matchesSearch && matchesCategory && matchesPrice;
  });

  // Featured filter
  if (featuredOnly) {
    filteredSarees = filteredSarees.filter(s => s.isFeatured);
  }

  // Count limit
  if (limit) {
    filteredSarees = filteredSarees.slice(0, limit);
  }

  if (filteredSarees.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white rounded-3xl border border-stone-100 max-w-xl mx-auto my-6 shadow-xs">
        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-600">
          <ShoppingBag size={28} />
        </div>
        <h3 className="font-serif text-lg font-bold text-stone-800 mb-1">
          No Gorgeous Sarees Found
        </h3>
        <p className="text-sm text-stone-500 font-sans leading-relaxed">
          We couldn&apos;t find any drapes matching your exact filters. Try loosening your price limit or clearing the search text to explore our full handloom collections!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredSarees.map(saree => (
        <ProductCard key={saree.id} product={saree} />
      ))}
    </div>
  );
};
