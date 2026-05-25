import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SareeProduct, Review } from '../types';
import { MOCK_SAREES } from '../data/mockSarees';

const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://saree-collections-jqa7.onrender.com/api";

interface FilterState {
  search: string;
  category: string;
  priceRange: number;
}

interface ShopContextType {
  sarees: SareeProduct[];
  favorites: string[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  toggleFavorite: (id: string) => void;
  isItemFavorite: (id: string) => boolean;
  getWhatsAppOrderUrl: (product: SareeProduct, customText?: string) => string;
  isLoading: boolean;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sarees, setSarees] = useState<SareeProduct[]>(MOCK_SAREES);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch products from MongoDB backend and merge with mock data
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_URL}/products`);
      if (res.ok) {
        const data = await res.json();

        // Normalize backend products to match SareeProduct shape
        const backendProducts: SareeProduct[] = data.map((p: any) => ({
          id: p._id || p.id,
          name: p.name || "",
          price: Number(p.price) || 0,
          category: (p.category || "").toLowerCase().replace(/\s+saree$/i, "").replace(/\s+/g, "") as SareeProduct["category"],
          description: p.description || "",
          details: p.details || [],
          fabric: p.fabric || p.category || "",
          zariWork: p.zariWork || "None" as SareeProduct["zariWork"],
          craftsmanship: p.craftsmanship || "Handloom" as SareeProduct["craftsmanship"],
          images: p.images && p.images.length > 0
            ? p.images
            : (p.image ? [p.image] : ["https://picsum.photos/seed/default/800/1200"]),
          colors: p.colors || [{ name: p.category || "Default", hex: "#8a1f1f" }],
          isFeatured: p.isFeatured || false,
          isTrending: p.isTrending || false,
          isCodAvailable: p.isCodAvailable !== false,
          rating: p.rating || 4.5,
          reviewsCount: p.reviewsCount || 0,
          stockStatus: p.stockStatus,
        }));

        // Combine: backend products first, then mock data as fallback
        // Remove any mock products that have the same name as a backend product
        const backendNames = new Set(backendProducts.map((p) => p.name.toLowerCase()));
        const filteredMock = MOCK_SAREES.filter((m) => !backendNames.has(m.name.toLowerCase()));

        setSarees([...backendProducts, ...filteredMock]);
      }
    } catch (err) {
      console.warn("Could not fetch products from backend, using mock data:", err);
      // Keep mock data as fallback
      setSarees(MOCK_SAREES);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Persistence in local storage
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('saree_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    priceRange: 60000 // default max price
  });

  useEffect(() => {
    localStorage.setItem('saree_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      if (prev.includes(id)) {
        return prev.filter(favId => favId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const isItemFavorite = (id: string) => favorites.includes(id);

  // Generate beautiful pre-filled whatsapp ordering links
  const getWhatsAppOrderUrl = (product: SareeProduct, customText?: string) => {
    const basePhone = '919876543210'; // Representative local clothing store number
    const messageHeader = `🌸 *ZARI SILK BOUTIQUE ENQUIRY* 🌸\n\n`;
    const messageBody = customText || `Hello! I would like to place an order/enquire about this gorgeous saree:\n\n*Name:* ${product.name}\n*Category:* ${product.category.toUpperCase()}\n*Fabric:* ${product.fabric}\n*Craftsmanship:* ${product.craftsmanship}\n*Zari:* ${product.zariWork}\n*Price:* ₹${product.price.toLocaleString('en-IN')}\n\nCan you please check availability and help with blouse stitching?`;

    // Construct public share link if possible or dev link
    const pageUrl = window.location.href;
    const footer = `\n\n*Product Link:* ${pageUrl}`;

    const fullMessage = encodeURIComponent(messageHeader + messageBody + footer);
    return `https://wa.me/${basePhone}?text=${fullMessage}`;
  };

  return (
    <ShopContext.Provider value={{
      sarees,
      favorites,
      filters,
      setFilters,
      toggleFavorite,
      isItemFavorite,
      getWhatsAppOrderUrl,
      isLoading
    }}>
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
