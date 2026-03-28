'use client';

import React, { memo } from 'react';
import { motion } from 'framer-motion';

const Tile = memo(({ id, color, ownerName, onClick }) => {
  return (
    <motion.div
      onClick={() => onClick(id)}
      initial={false}
      animate={{ backgroundColor: color }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full aspect-square border-[0.5px] border-zinc-200 dark:border-zinc-800 cursor-pointer relative group"
      whileHover={{ 
        scale: 1.15, 
        zIndex: 50,
        boxShadow: "0 0 16px rgba(0,0,0,0.1)",
        borderRadius: "2px"
      }}
      whileTap={{ scale: 0.9 }}
    >
      <div className="absolute inset-0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors" />
      
      {ownerName && (
        <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] py-1 px-2 rounded-md whitespace-nowrap z-[100] shadow-xl pointer-events-none transform translate-y-1 group-hover:translate-y-0 transition-transform">
          Claimed by {ownerName}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-t-4 border-t-zinc-900 border-x-4 border-x-transparent" />
        </div>
      )}
    </motion.div>
  );
});

Tile.displayName = 'Tile';

export default Tile;
