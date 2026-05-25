import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { CategorySection } from '../components/CategorySection';
import { ProductGrid } from '../components/ProductGrid';
import { Testimonials } from '../components/Testimonials';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShieldCheck, Video, HeartHandshake, Sparkles, Instagram, Plus } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // Highlight points
  const trustPoints = [
    {
      icon: <ShieldCheck size={28} className="text-burgundy-700" />,
      title: "Silk Mark Certified Threads",
      desc: "Every drape comes with official hallmark verification guaranteeing 100% organic premium threads."
    },
    {
      icon: <Video size={28} className="text-burgundy-700" />,
      title: "Live WhatsApp Video Preview",
      desc: "Connect directly with our demo-web assistants via real-time high definition video calls before buying."
    },
    {
      icon: <HeartHandshake size={28} className="text-burgundy-700" />,
      title: "Expert Tailoring Artisans",
      desc: "We provide custom padded lining, custom back designs, and falls done to measurements."
    }
  ];

  // Instagram simulated catalog
  const instagramFeed = [
    { id: 'ig01', img: 'https://picsum.photos/seed/saree_ig1/600/600', link: 'https://instagram.com' },
    { id: 'ig02', img: 'https://picsum.photos/seed/saree_ig2/600/600', link: 'https://instagram.com' },
    { id: 'ig03', img: 'https://picsum.photos/seed/saree_ig3/600/600', link: 'https://instagram.com' },
    { id: 'ig04', img: 'https://picsum.photos/seed/saree_ig4/600/600', link: 'https://instagram.com' },
    { id: 'ig05', img: 'https://picsum.photos/seed/saree_ig5/600/600', link: 'https://instagram.com' }
  ];

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Highlight trust points section */}
      <section className="py-16 bg-white border-b border-stone-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {trustPoints.map((pt, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="flex gap-4 p-4 text-left"
              >
                <div className="p-3 bg-burgundy-50 rounded-xl h-fit shadow-xs">
                  {pt.icon}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-stone-800 text-sm tracking-wide mb-1.5 uppercase">
                    {pt.title}
                  </h3>
                  <p className="text-stone-500 text-xs leading-relaxed font-sans">
                    {pt.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Category Section */}
      <CategorySection />

      {/* 4. Featured Collections Display */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-16">
            <div className="text-left md:max-w-xl">
              <span className="text-burgundy-700 text-xs font-bold uppercase tracking-widest font-sans">
                Signature Curations
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-2 font-medium">
                The Masterpieces
              </h2>
              <div className="w-12 h-0.5 bg-gold-400 mt-3" />
              <p className="text-sm text-stone-500 font-sans mt-3">
                Hand-selected sarees that combine heavy wedding borders with lightweight daily grace.
              </p>
            </div>

            <button
              onClick={() => navigate('/collections')}
              className="px-6 py-3 bg-stone-900 text-white font-sans font-bold text-xs uppercase tracking-wider rounded-xl hover:bg-burgundy-700 hover:shadow-md transition-all self-start md:self-center cursor-pointer"
            >
              Explore Full Vault
            </button>
          </div>

          <ProductGrid limit={3} featuredOnly={true} />
        </div>
      </section>

      {/* 5. Elegant Banner for Handloom Heritage */}
      <section className="py-24 bg-linear-to-r from-stone-900 via-gold-900 to-stone-800 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(185,129,55,0.15),transparent)] pointer-events-none" />
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <Sparkles className="text-gold-300 w-10 h-10 mb-6 fill-gold-300/15" />

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium leading-[1.25] text-gold-50 mb-6 text-center max-w-2xl">
              Support Our Weaver Communities Directly
            </h2>

            <p className="text-stone-300 text-sm max-w-xl leading-relaxed mb-10 font-sans">
              Unlike generic corporate power-looms, our sarees are processed in small local weaver houses in Varanasi, Kanchipuram, and Chanderi. Buying a Zari saree supports active artisan wages directly.
            </p>

            <button
              onClick={() => navigate('/about')}
              className="bg-gold-500 hover:bg-gold-400 text-stone-950 font-sans font-bold py-3.5 px-8 rounded-xl tracking-wider uppercase text-xs transition-colors cursor-pointer"
            >
              Discover Our Roots
            </button>
          </motion.div>
        </div>
      </section>

      {/* 6. Trending Products Section */}
      <section className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-burgundy-700 text-xs font-bold uppercase tracking-widest font-sans">
              What Weavers Are Crafting Now
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-2 font-medium">
              Trending Drapes
            </h2>
            <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-3" />
            <p className="text-sm text-stone-500 font-sans mt-3">
              Explore dynamic designs fresh off the looms, chosen by modern fashion experts.
            </p>
          </div>

          <ProductGrid limit={3} />
        </div>
      </section>

      {/* 7. Testimonials */}
      <Testimonials />

      {/* 8. Instagram follow section */}
      <section className="py-16 bg-white border-t border-stone-100 select-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <div className="mb-10">
            <Instagram size={24} className="text-burgundy-700 mx-auto mb-3" />
            <span className="text-stone-400 text-xs font-semibold uppercase tracking-wider font-sans">Instagram</span>
            <h2 className="text-2xl font-serif text-stone-800 mt-1 font-semibold">
              Share Your #Zaridemo-web Style
            </h2>
            <p className="text-xs text-stone-500 mt-1.5 font-sans">
              Follow us on social handles to browse real customer fits and lookbooks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {instagramFeed.map(feed => (
              <a
                key={feed.id}
                href={feed.link}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer"
              >
                <img
                  src={feed.img}
                  alt="Saree Instagram Grid lookup"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-2 bg-white/90 rounded-full text-stone-800 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                    <Plus size={16} />
                  </span>
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};
export default Home;
