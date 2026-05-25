import React from 'react';
import { MOCK_REVIEWS } from '../data/mockSarees';
import { Star, Quote, Shield } from 'lucide-react';
import { motion } from 'motion/react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-burgundy-700 text-xs font-bold uppercase tracking-widest font-sans">
            Client Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mt-1 font-medium">
            Treasured In Our Drapes
          </h2>
          <div className="w-12 h-0.5 bg-gold-400 mx-auto mt-3" />
          <p className="text-sm text-stone-500 font-sans mt-3">
            Real feedback from grand wedding events across India and worldwide.
          </p>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {MOCK_REVIEWS.map((review, idx) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-stone-50 rounded-2xl p-8 border border-stone-100 shadow-xs flex flex-col justify-between relative group hover:border-gold-300 transition-colors"
            >
              <div className="absolute top-6 right-8 text-stone-200 group-hover:text-gold-200 transition-colors pointer-events-none">
                <Quote size={40} className="stroke-current fill-current opacity-30" />
              </div>

              <div>
                {/* Stars */}
                <div className="flex gap-0.5 text-amber-500 mb-4 select-none">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={15} className="fill-current" />
                  ))}
                </div>

                {/* Review Message */}
                <p className="text-stone-600 text-sm font-sans leading-relaxed italic pr-4">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5 mt-6 border-t border-stone-200/50 pt-5">
                <div className="w-11 h-11 rounded-full overflow-hidden bg-stone-200 border border-stone-100 shadow-xs">
                  <img
                    src={review.avatarUrl}
                    alt={review.author}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-stone-800 tracking-wide">
                    {review.author}
                  </h4>
                  <div className="flex items-center gap-1.5 text-[10px] text-stone-400 uppercase font-sans mt-0.5">
                    <span className="font-mono">{review.date}</span>
                    <span className="w-1 h-1 rounded-full bg-stone-300" />
                    <span className="flex items-center gap-0.5 text-emerald-600 font-semibold uppercase">
                      <Shield size={10} /> Verified Purchase
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Global demo-web Trust elements */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto text-center border-t border-stone-100 pt-16">
          <div className="p-4">
            <h3 className="font-serif font-semibold text-stone-800 text-base">Direct Consultation</h3>
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed font-sans">Enquire fabric details, get actual photo zoom sheets, and interact with matching blouse designers directly over high-speed secure chats.</p>
          </div>
          <div className="p-4">
            <h3 className="font-serif font-semibold text-stone-800 text-base">Custom Stitching</h3>
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed font-sans">Our demo-web tailoring workshop stitches custom designer necks, heavy thread borders, pad-inserts, and custom size linings tailored directly to order.</p>
          </div>
          <div className="p-4">
            <h3 className="font-serif font-semibold text-stone-800 text-base">Global Secure Delivery</h3>
            <p className="text-xs text-stone-400 mt-1.5 leading-relaxed font-sans">Carefully padded demo-web boxes packed in waterproof layers, shipped worldwide with DHL/FedEx parcel tracking numbers directly shared.</p>
          </div>
        </div>

      </div>
    </section>
  );
};
export default Testimonials;
