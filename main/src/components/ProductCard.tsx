import React from 'react';
import { motion } from 'motion/react';
import { Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { SareeProduct } from '../types';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: SareeProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleFavorite, isItemFavorite } = useShop();
  const navigate = useNavigate();
  const isFavorite = isItemFavorite(product.id);

  const discountedPct = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="group bg-white rounded-2xl overflow-hidden border border-stone-100 shadow-xs hover:shadow-md hover:border-gold-300/40 transition-all duration-300 flex flex-col h-full"
    >
      {/* Saree Image Container */}
      <div className="relative pt-[125%] overflow-hidden bg-stone-50 cursor-pointer" onClick={handleCardClick}>
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isFeatures || product.isFeatured ? (
            <span className="bg-stone-900/95 text-white backdrop-blur-xs text-[10px] tracking-widest uppercase py-1 px-2.5 rounded-md font-serif font-medium shadow-xs">
              demo-web Curated
            </span>
          ) : null}
          {product.isTrending ? (
            <span className="bg-amber-600/95 text-white backdrop-blur-xs text-[10px] tracking-widest uppercase py-1 px-2.5 rounded-md font-serif font-medium shadow-xs">
              Trending
            </span>
          ) : null}
          {discountedPct > 0 ? (
            <span className="bg-burgundy-700 text-white text-[10px] tracking-wider uppercase py-1 px-2 rounded-md font-semibold shadow-xs">
              {discountedPct}% OFF
            </span>
          ) : null}
        </div>

        {/* Whislist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(product.id);
          }}
          className="absolute top-3 right-3 p-2 bg-white/94 hover:bg-white text-stone-700 rounded-full shadow-md hover:shadow-lg hover:scale-110 active:scale-95 transition-all z-10 cursor-pointer"
          aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart
            size={18}
            className={`transition-colors duration-300 ${isFavorite ? 'fill-burgundy-600 stroke-burgundy-600' : 'stroke-stone-700 hover:stroke-burgundy-600'
              }`}
          />
        </button>

        {/* Bottom fading info bar when hovering */}
        <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-stone-900/80 via-stone-900/20 to-transparent p-4 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between pointer-events-none">
          <span className="text-[11px] text-white/90 font-medium font-sans">
            {product.fabric}
          </span>
          <span className="text-[11px] text-yellow-300 font-semibold font-sans">
            ★ {product.rating}
          </span>
        </div>
      </div>

      {/* Saree Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="cursor-pointer" onClick={handleCardClick}>
          {/* Fabric, Zari, Craftsmanship Meta indicators */}
          <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-wider font-semibold text-stone-400 font-sans">
            <span>{product.craftsmanship}</span>
            <span className="w-1 h-1 rounded-full bg-stone-300" />
            <span>{product.zariWork} Zari</span>
          </div>

          <h3 className="font-serif text-base font-semibold text-stone-800 leading-snug group-hover:text-burgundy-700 transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          <p className="text-[12px] text-stone-500 font-sans line-clamp-2 leading-relaxed mb-4">
            {product.description}
          </p>
        </div>

        <div>
          {/* Price & COD Indicator */}
          <div className="flex items-baseline justify-between gap-2 border-t border-stone-100 pt-3.5 mb-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-extrabold text-stone-900 text-lg">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice && (
                <span className="text-[13px] text-stone-400 line-through font-sans">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {product.isCodAvailable && (
              <span className="flex items-center gap-1 text-[10px] font-semibold text-stone-500 font-sans bg-stone-50 px-2 py-0.5 rounded border border-stone-100" title="Cash on delivery is available for this saree">
                <ShieldCheck size={11} className="text-emerald-600" />
                COD Available
              </span>
            )}
          </div>

          {/* Action button */}
          <button
            onClick={handleCardClick}
            className="w-full bg-stone-900 hover:bg-burgundy-850 text-white py-2.5 px-4 rounded-xl text-xs tracking-wider uppercase font-sans font-semibold flex items-center justify-center gap-1.5 transition-all group-hover:bg-burgundy-700 hover:shadow-md cursor-pointer"
          >
            Explore Saree
            <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
