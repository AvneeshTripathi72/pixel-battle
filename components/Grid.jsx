'use client';

import React from 'react';
import { useSocket } from '../context/SocketContext';
import Tile from './Tile';
import { motion } from 'framer-motion';

export default function Grid() {
  const { grid, handleTileClick } = useSocket();

  return (
    <div className="relative w-full max-w-[90vh] mx-auto aspect-square bg-zinc-100 dark:bg-zinc-950 rounded-2xl p-3 border border-zinc-200 dark:border-zinc-800 shadow-2xl animate-in fade-in zoom-in duration-1000">
      <div 
        className="grid grid-cols-[repeat(40,minmax(0,1fr))] gap-0 w-full h-full overflow-hidden rounded-[calc(1rem-0.75rem)] shadow-inner"
        style={{ touchAction: 'none' }}
      >
        {grid.map((tile) => (
          <Tile
            key={tile.id}
            id={tile.id}
            color={tile.color}
            ownerName={tile.ownerName}
            onClick={handleTileClick}
          />
        ))}
      </div>
    </div>
  );
}
