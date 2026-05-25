import React from 'react';
import { motion } from 'motion/react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-12">
      <div className="relative flex items-center justify-center">
        {/* Outer glowing pulsing ring */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.6, 0.3],
            rotate: 360,
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute w-20 h-20 border border-double border-gold-300 rounded-full"
        />
        
        {/* Inner spinning thread ring */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-12 h-12 border-2 border-t-burgundy-600 border-r-gold-500 border-b-burgundy-200 border-l-transparent rounded-full"
        />
        
        {/* Core sparkling element */}
        <div className="absolute text-gold-600 text-xs font-serif font-semibold">
          ZARI
        </div>
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-6 text-sm text-stone-500 tracking-wider font-sans"
      >
        Unveiling Royal Drapes...
      </motion.p>
    </div>
  );
};
