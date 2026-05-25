import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Loader } from '../components/Loader';
import { ArrowLeft, MessageCircle, CreditCard, ShieldCheck, Heart, Share2, Sparkles, Star, ChevronRight, Truck, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductCard } from '../components/ProductCard';
import { CATEGORIES } from '../data/mockSarees';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sarees, toggleFavorite, isItemFavorite, getWhatsAppOrderUrl } = useShop();

  // Find target saree
  const saree = sarees.find(item => item.id === id);

  // Category metadata lookup
  const selectedCategoryMeta = saree ? CATEGORIES.find(c => c.id === saree.category) : undefined;

  // States
  const [activeImage, setActiveImage] = useState<string>(saree ? saree.images[0] : '');
  const [selectedColor, setSelectedColor] = useState<number>(0);
  const [showShareNotification, setShowShareNotification] = useState<boolean>(false);
  const [showReceiptModal, setShowReceiptModal] = useState<boolean>(false);
  const [customBlouseDesired, setCustomBlouseDesired] = useState<boolean>(false);
  const [detailsTab, setDetailsTab] = useState<'specs' | 'care' | 'shipping'>('specs');

  // Sync state when saree changes
  React.useEffect(() => {
    if (saree) {
      setActiveImage(saree.images[0]);
      setSelectedColor(0);
    }
  }, [saree]);

  if (!saree) {
    return (
      <div className="py-24 text-center">
        <h2 className="text-xl font-serif text-stone-800">Saree Drape Not Found</h2>
        <p className="text-stone-500 mt-2 text-sm font-sans">The saree model may be temporarily out of stock or retired from the handlooms.</p>
        <Link to="/collections" className="mt-6 inline-flex bg-burgundy-700 text-white text-xs uppercase tracking-wider font-sans font-bold px-5 py-3 rounded-xl">
          Back to Vault
        </Link>
      </div>
    );
  }

  const isFavorite = isItemFavorite(saree.id);

  // Get matching suggestions (excluding current item)
  const relatedSarees = sarees
    .filter(item => item.category === saree.category && item.id !== saree.id)
    .slice(0, 3);

  const discountedPct = saree.originalPrice
    ? Math.round(((saree.originalPrice - saree.price) / saree.originalPrice) * 100)
    : 0;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareNotification(true);
    setTimeout(() => {
      setShowShareNotification(false);
    }, 2500);
  };

  const handleOnlineCheckout = () => {
    // Elegant simulation of secure checkout payment setup
    setShowReceiptModal(true);
  };

  const handleWhatsAppBuy = () => {
    let customText = `Hello! I would like to buy the *${saree.name}* (ID: ${saree.id})\n`;
    customText += `*Fabric:* ${saree.fabric}\n`;
    customText += `*Price:* ₹${saree.price.toLocaleString('en-IN')}\n`;
    customText += `*Selected Shade:* ${saree.colors[selectedColor]?.name || 'Standard'}\n`;
    if (customBlouseDesired) {
      customText += `*Custom Blouse Stitching:* Yes, I need tailoring assistance 👚\n`;
    }
    customText += `\nPlease check availability and advise bank / UPI payment details!`;
    const finalUrl = getWhatsAppOrderUrl(saree, customText);
    window.open(finalUrl, '_blank');
  };

  return (
    <div className="bg-stone-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Breadcrumbs Navigation */}
        <div className="flex items-center gap-2 text-xs text-stone-400 font-sans mb-8 select-none">
          <Link to="/" className="hover:text-stone-700 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/collections" className="hover:text-stone-700 transition-colors">Collections</Link>
          <ChevronRight size={12} />
          <span className="text-stone-700 hover:text-stone-900 truncate max-w-sm">{saree.name}</span>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-white rounded-3xl p-6 sm:p-10 border border-stone-100 shadow-xs mb-16 items-start">

          {/* Column Left: Visual Assets & Multi-images */}
          <div className="lg:col-span-6 flex flex-col gap-4">

            {/* Primary Large Image Frame */}
            <div className="relative aspect-3/4 rounded-2xl overflow-hidden bg-stone-50 border border-stone-100">
              <img
                src={activeImage}
                alt={saree.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transform hover:scale-[1.03] transition-transform duration-700 cursor-zoom-in"
              />

              {/* Badges Overlay */}
              {discountedPct > 0 && (
                <span className="absolute top-4 left-4 bg-burgundy-700 text-white text-[11px] font-bold py-1 px-2.5 rounded-md uppercase tracking-wider font-sans">
                  {discountedPct}% Off
                </span>
              )}
            </div>

            {/* Gallery Thumbnails List */}
            <div className="flex gap-3">
              {saree.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-20 aspect-3/4 rounded-lg overflow-hidden border-2 bg-stone-50 transition-all cursor-pointer ${activeImage === img ? 'border-burgundy-700 scale-102 shadow-xs' : 'border-stone-100 hover:border-stone-300'
                    }`}
                  aria-label={`View image thumbnail ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${saree.name} detailed look`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </button>
              ))}
            </div>

          </div>

          {/* Column Right: Details & Order panel */}
          <div className="lg:col-span-6 flex flex-col justify-between text-left h-full">

            {/* Header info */}
            <div>
              <div className="flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold-50 border border-gold-100 rounded-full text-gold-800 text-[11px] font-semibold uppercase tracking-wider font-sans">
                  <Sparkles size={11} className="text-gold-500 fill-gold-500" />
                  {saree.craftsmanship} Legacy Piece
                </div>

                {/* Social Share & Wishlist */}
                <div className="flex items-center gap-2 relative">
                  <button
                    onClick={handleShare}
                    className="p-2 hover:bg-stone-50 text-stone-500 hover:text-stone-800 rounded-full transition-colors relative cursor-pointer"
                    title="Copy direct product link"
                  >
                    <Share2 size={16} />
                  </button>

                  <button
                    onClick={() => toggleFavorite(saree.id)}
                    className="p-2 hover:bg-stone-50 text-stone-500 hover:text-burgundy-700 rounded-full transition-colors cursor-pointer"
                    title={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart size={18} className={isFavorite ? 'fill-burgundy-600 stroke-burgundy-600' : 'stroke-current'} />
                  </button>

                  <AnimatePresence>
                    {showShareNotification && (
                      <motion.span
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute bottom-full right-0 mb-2 bg-stone-900 text-white text-[10px] py-1 px-2.5 rounded shadow-lg whitespace-nowrap font-sans pointer-events-none"
                      >
                        ✓ Product Link Copied!
                      </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <h1 className="text-2xl sm:text-3xl font-serif font-semibold text-stone-900 mt-4 leading-tight">
                {saree.name}
              </h1>

              {/* Verified Product Quality Star feedback */}
              <div className="flex items-center gap-3 mt-3.5 select-none font-sans">
                <div className="flex gap-0.5 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < Math.floor(saree.rating) ? 'fill-current' : 'stroke-current'}
                    />
                  ))}
                </div>
                <span className="text-xs text-stone-500">
                  <strong>{saree.rating}</strong> ({saree.reviewsCount} customer drapes)
                </span>
              </div>

              {/* Price bracket */}
              <div className="flex items-baseline gap-3 my-6 pb-6 border-b border-stone-100">
                <span className="text-3xl font-serif font-extrabold text-stone-900">
                  ₹{saree.price.toLocaleString('en-IN')}
                </span>
                {saree.originalPrice && (
                  <span className="text-lg text-stone-400 line-through font-sans">
                    ₹{saree.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                <span className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100/60 py-1 px-2 rounded-md font-semibold font-sans uppercase">
                  Inclusive of all taxes
                </span>
              </div>

              {/* Highlight summary description */}
              <p className="text-sm text-stone-600 font-sans leading-relaxed mb-6">
                {saree.description}
              </p>

              {/* Color options picker */}
              <div className="mb-6">
                <h4 className="text-xs uppercase tracking-wider font-semibold text-stone-400 mb-3 font-sans">
                  Available Shades At demo-web
                </h4>
                <div className="flex items-center gap-3">
                  {saree.colors.map((color, idx) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(idx)}
                      className={`flex items-center gap-2 pl-2.5 pr-3 py-1.5 rounded-full border text-xs font-semibold font-sans cursor-pointer transition-all ${selectedColor === idx
                          ? 'border-burgundy-700 bg-burgundy-50/50 text-burgundy-800'
                          : 'border-stone-200 hover:border-stone-300 bg-white text-stone-600'
                        }`}
                    >
                      <span
                        className="w-3.5 h-3.5 rounded-full border border-stone-950/10 shadow-xs"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* demo-web Tailoring Checkbox Option */}
              <div className="mb-8 p-4 bg-stone-50 rounded-2xl border border-stone-100">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={customBlouseDesired}
                    onChange={(e) => setCustomBlouseDesired(e.target.checked)}
                    className="mt-1 w-4 h-4 text-burgundy-600 focus:ring-burgundy-500 border-stone-300 rounded cursor-pointer"
                  />
                  <div className="text-left font-sans text-xs">
                    <span className="font-semibold block text-burgundy-800 mb-0.5 font-serif">✂ Add Bespoke Blouse Tailoring (+₹1,500)</span>
                    <span className="text-stone-500 leading-normal block">Includes matching lined unstitched fabric, custom neckline styling, and padding. Check yes to discuss sizing parameters over WhatsApp.</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Direct WhatsApp Order Link + COD info row */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* Product spec whatsapp purchase link */}
                <button
                  onClick={handleWhatsAppBuy}
                  className="bg-emerald-500 hover:bg-emerald-600 text-white font-sans font-bold uppercase tracking-wider text-xs py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <MessageCircle size={15} className="fill-white stroke-none" />
                  Place Order on WhatsApp
                </button>

                {/* Instant Online Secure Checkout simulated */}
                <button
                  onClick={handleOnlineCheckout}
                  className="bg-stone-900 hover:bg-burgundy-700 text-white font-sans font-bold uppercase tracking-wider text-xs py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-xs hover:shadow-md transition-all cursor-pointer"
                >
                  <CreditCard size={15} />
                  Book / Buy Online
                </button>

              </div>

              {/* Protective bullet details */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-y-2 gap-x-6 text-[11px] text-stone-500 font-sans mt-3 select-none">
                <span className="flex items-center gap-1">
                  <ShieldCheck size={14} className="text-emerald-600" />
                  COD Available Worldwide
                </span>
                <span className="flex items-center gap-1">
                  <Truck size={14} className="text-amber-600" />
                  Insured Double box shipping
                </span>
                <span className="flex items-center gap-1">
                  <RefreshCw size={12} className="text-stone-500" />
                  Easy 7-day trials & exchanges
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Tabbed Specs, Care and Shipping block */}
        <section className="bg-white border border-stone-100 rounded-3xl p-6 sm:p-10 mb-20 text-left">

          <div className="flex border-b border-stone-100 gap-6 mb-8">
            <button
              onClick={() => setDetailsTab('specs')}
              className={`pb-4 text-xs font-semibold uppercase tracking-wider font-sans border-b-2 transition-colors cursor-pointer ${detailsTab === 'specs'
                  ? 'border-burgundy-700 text-burgundy-800'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
            >
              Fabric Specifications
            </button>
            <button
              onClick={() => setDetailsTab('care')}
              className={`pb-4 text-xs font-semibold uppercase tracking-wider font-sans border-b-2 transition-colors cursor-pointer ${detailsTab === 'care'
                  ? 'border-burgundy-700 text-burgundy-800'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
            >
              demo-web Care Guide
            </button>
            <button
              onClick={() => setDetailsTab('shipping')}
              className={`pb-4 text-xs font-semibold uppercase tracking-wider font-sans border-b-2 transition-colors cursor-pointer ${detailsTab === 'shipping'
                  ? 'border-burgundy-700 text-burgundy-800'
                  : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
            >
              Delivery & Exchange
            </button>
          </div>

          <div className="font-sans text-sm leading-relaxed text-stone-600">
            <AnimatePresence mode="wait">
              {detailsTab === 'specs' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-stone-50 pb-2">
                        <strong className="text-stone-800 text-xs font-medium">demo-web Fabric</strong>
                        <span className="text-stone-600 text-xs">{saree.fabric}</span>
                      </li>
                      <li className="flex justify-between border-b border-stone-50 pb-2">
                        <strong className="text-stone-800 text-xs font-medium">Zari Composition</strong>
                        <span className="text-stone-600 text-xs">{saree.zariWork} threads</span>
                      </li>
                      <li className="flex justify-between border-b border-stone-50 pb-2">
                        <strong className="text-stone-800 text-xs font-medium">Loom Production</strong>
                        <span className="text-stone-600 text-xs">{saree.craftsmanship} certified</span>
                      </li>
                    </ul>
                    <ul className="space-y-3">
                      <li className="flex justify-between border-b border-stone-50 pb-2">
                        <strong className="text-stone-800 text-xs font-medium">Saree Length</strong>
                        <span className="text-stone-600 text-xs">5.5 meters (approx)</span>
                      </li>
                      <li className="flex justify-between border-b border-stone-50 pb-2">
                        <strong className="text-stone-800 text-xs font-medium">Matching Blouse fabric</strong>
                        <span className="text-stone-600 text-xs">Unstitched, matching base hue (80cm)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4">
                    <h4 className="font-serif font-bold text-stone-800 text-sm mb-3">Complete Artisan Handloom Credentials:</h4>
                    <ul className="list-disc pl-5 space-y-2 text-xs">
                      {saree.details.map((detail, idx) => (
                        <li key={idx} className="text-stone-500">{detail}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

              {detailsTab === 'care' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 text-xs"
                >
                  <p>Our traditional drapes are hand-crafted from delicate premium fibers, heavy pure golds, and natural berry food vegetable dyes. Please treat with caution:</p>
                  <ul className="list-disc pl-5 space-y-2.5 text-stone-500">
                    <li><strong>Dry Clean ONLY:</strong> Never wash Kanjeevarams or Banarasi silks in standard household wash drums or using harsh detergent chemicals.</li>
                    <li><strong>Wand Ironing parameters:</strong> Avoid high-heat contact irons over precious silk gold fields. Iron inside out over a layered clean cotton sheet using low silk steam settings only.</li>
                    <li><strong>Storage:</strong> Fold with clean tissue sheets inside breathing premium cotton bags. Never hang heavy silk drapes on cheap metallic hangers as it pulls and damages delicate thread balances. Air inside shadows every 6 months.</li>
                  </ul>
                </motion.div>
              )}

              {detailsTab === 'shipping' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-4 text-xs"
                >
                  <p>Each drape is meticulously double-checked for thread flaws under high power lamps at our central demo-web before box packing.</p>
                  <ul className="list-disc pl-5 space-y-2.5 text-stone-500">
                    <li><strong>Standard Domestic Transit:</strong> Shipped via fully insured Air Cargo, arriving in 2-5 business days across India.</li>
                    <li><strong>International Shipping:</strong> Arrives in 5-9 business days worldwide. Customs clearances are managed completely by our delivery partners.</li>
                    <li><strong>Exchanges and Fits:</strong> Unused sarees with authentic weaver tags and unbroken security hallmark labels are eligible for 100% full value exchanges or store credits within 7 days from delivery.</li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </section>

        {/* RELATED SAREES */}
        {relatedSarees.length > 0 && (
          <section className="mb-14">
            <div className="text-left mb-10">
              <span className="text-burgundy-700 text-xs font-bold uppercase tracking-widest font-sans">
                More in {selectedCategoryMeta?.displayName || saree.category}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-1 font-medium">
                Similar Handlooms
              </h2>
              <div className="w-12 h-0.5 bg-gold-400 mt-2" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedSarees.map(related => (
                <ProductCard key={related.id} product={related} />
              ))}
            </div>
          </section>
        )}

      </div>

      {/* Online simulated checkout drawer Modal */}
      <AnimatePresence>
        {showReceiptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReceiptModal(false)}
              className="absolute inset-0 bg-black"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl border border-stone-100 z-10 text-left font-sans"
            >
              <div className="text-center mb-6">
                <span className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600">
                  ✓
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  demo-web Booking Simulated!
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Secure reservation holds for 24 hours.
                </p>
              </div>

              <div className="space-y-3.5 border-t border-b border-stone-100 py-4 text-xs font-sans">
                <div className="flex justify-between text-stone-500">
                  <span>Selected drape:</span>
                  <strong className="text-stone-850 truncate max-w-[200px]">{saree.name}</strong>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Category style:</span>
                  <span className="text-stone-700 capitalize">{saree.category}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Selected shade:</span>
                  <span className="text-stone-700 font-medium">{saree.colors[selectedColor]?.name}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Custom Blouse added:</span>
                  <span className="text-stone-700 font-medium">{customBlouseDesired ? 'Yes (+₹1,500)' : 'No'}</span>
                </div>
                <div className="flex justify-between border-t border-stone-50 pt-2 text-sm">
                  <strong className="text-stone-800">Reservation Pledge Total:</strong>
                  <strong className="text-burgundy-700 font-mono text-base font-extrabold">
                    ₹{(saree.price + (customBlouseDesired ? 1500 : 0)).toLocaleString('en-IN')}
                  </strong>
                </div>
              </div>

              <div className="pt-5 space-y-3">
                <p className="text-[11px] leading-relaxed text-stone-500 bg-stone-50 p-2.5 rounded-lg text-center font-sans">
                  👩💼 Our demo-web designer will now reach out to you via Email / Mobile to verify your billing coordinates, complete standard UPI transfers, and gather blouse stitching parameters!
                </p>
                <button
                  onClick={() => setShowReceiptModal(false)}
                  className="w-full bg-stone-900 hover:bg-burgundy-700 text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider cursor-pointer text-center"
                >
                  Understood & Continue
                </button>
              </div>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
export default ProductDetails;
