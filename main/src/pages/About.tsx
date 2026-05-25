import React from 'react';
import { motion } from 'motion/react';
import boutiqueInterior from '../assets/images/boutique_interior_1779684955428.png';
import { Target, Users, Sparkles, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-stone-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Banner Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-burgundy-700 text-xs font-bold uppercase tracking-widest font-sans">
            Our Legacy & Heritage
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 mt-2 font-medium">
            Where Every Thread Tells a Story
          </h1>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-4" />
          <p className="text-sm text-stone-500 font-sans mt-4 leading-relaxed">
            Since our beginnings, Zari Silk demo-web has worked diligently alongside traditional handloom weaver centers to revive pure zari craftsmanship.
          </p>
        </div>

        {/* Story Section: Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">

          {/* Image Block: demo-web Interior */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-stone-100"
            >
              <img
                src={boutiqueInterior}
                alt="Inside Zari Silk demo-web Showroom"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-4 border border-gold-300/20 rounded-xl pointer-events-none" />
            </motion.div>
          </div>

          {/* Text Block: Roots */}
          <div className="lg:col-span-6 text-left space-y-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-stone-800">
              Preserving Loom Integrity
            </h2>

            <p className="text-stone-600 text-xs sm:text-sm font-sans leading-relaxed">
              Founded by master textile curator <strong>Vatsal Shah</strong>, Zari demo-web open-sourced traditional weaver channels to bring original village drapes straight to modern connoisseurs. Guided by the principles of ethical patronage and aesthetic sophistication, we preserve heritage double-warp silk.
            </p>

            <p className="text-stone-600 text-xs sm:text-sm font-sans leading-relaxed">
              We travel directly to Kanchipuram, Varanasi, Chanderi, and Bengal, identifying weavers who practice authentic loom techniques. By ensuring zero machinery compromise and fully certifying each thread with standard <strong>Silk Mark</strong> security seals, we guarantee family heirloom collectibles.
            </p>

            <blockquote className="border-l-4 border-gold-500 pl-4 py-1 italic text-stone-700 text-xs sm:text-sm font-serif bg-stone-100/60 pr-2">
              &quot;A genuinely handloomed pure gold zari saree is not modern apparel; it is fine jewelry wrapped in silken wind, passing from a mother to her daughter mirroring eternal blessings.&quot;
              <span className="block text-stone-400 font-sans font-bold uppercase tracking-wider text-[10px] mt-2 select-none">— Vatsal Shah, Founder</span>
            </blockquote>
          </div>

        </div>

        {/* Owner/Curator Cards & Mission values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 text-left">

          <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-xs flex flex-col items-start gap-4">
            <div className="p-3 bg-burgundy-50 text-burgundy-700 rounded-xl">
              <Target size={24} />
            </div>
            <h3 className="font-serif font-bold text-stone-850 text-sm tracking-wide uppercase">Our Core Mission</h3>
            <p className="text-stone-500 text-xs leading-relaxed font-sans">
              Provide sustainable high wages for traditional weaving communities, bypass greedy distributors, and deliver original certified sarees straight to premium drapers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-xs flex flex-col items-start gap-4">
            <div className="p-3 bg-burgundy-50 text-burgundy-700 rounded-xl">
              <Users size={24} />
            </div>
            <h3 className="font-serif font-bold text-stone-850 text-sm tracking-wide uppercase">Community Patronage</h3>
            <p className="text-stone-500 text-xs leading-relaxed font-sans">
              Currently funding 42 distinct weaving units spanning central Varanasi and rural Southern silk clusters, ensuring children of weavers retain artistic schooling.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 border border-stone-100 shadow-xs flex flex-col items-start gap-4">
            <div className="p-3 bg-burgundy-50 text-burgundy-700 rounded-xl">
              <Award size={24} />
            </div>
            <h3 className="font-serif font-bold text-stone-850 text-sm tracking-wide uppercase">Artisan Credentials</h3>
            <p className="text-stone-500 text-xs leading-relaxed font-sans">
              Every curated masterpiece comes personally signed by the respective master weaver, outlining hours of manual weaving labor on physical certificates.
            </p>
          </div>

        </div>

        {/* Small demo-web showroom gallery section */}
        <section className="bg-white border border-stone-100 rounded-3xl p-8 sm:p-12 text-center">
          <Sparkles className="text-gold-400 w-8 h-8 mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-semibold text-stone-800 mb-2">Experience The Loom</h2>
          <p className="text-stone-500 text-xs max-w-xl mx-auto font-sans leading-relaxed mb-8">
            Our physical showroom displays the majestic threads live. Meet our textile specialists, study warp under magnification lens systems, and run fitting consultations.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl overflow-hidden aspect-4/3 bg-stone-50 shadow-xs relative group cursor-pointer">
              <img src="https://picsum.photos/seed/bout_gal1/600/450" alt="demo-web showroom drape folds" className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-4/3 bg-stone-50 shadow-xs relative group cursor-pointer">
              <img src="https://picsum.photos/seed/bout_gal2/600/450" alt="Weaving threads macro" className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" />
            </div>
            <div className="rounded-xl overflow-hidden aspect-4/3 bg-stone-50 shadow-xs relative group cursor-pointer">
              <img src="https://picsum.photos/seed/bout_gal3/600/450" alt="Artisan handloom workspace" className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500" />
            </div>
          </div>

          <button
            onClick={() => navigate('/contact')}
            className="mt-10 bg-stone-900 hover:bg-burgundy-700 text-white font-sans font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl transition-colors cursor-pointer"
          >
            Schedule a Store Visit
          </button>
        </section>

      </div>
    </div>
  );
};
export default About;
