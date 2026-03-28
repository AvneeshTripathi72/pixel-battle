'use client';

import React from 'react';
import { useSocket } from '../context/SocketContext';
import { Trophy, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Leaderboard() {
  const { leaderboard } = useSocket();

  return (
    <div className="fixed right-4 bottom-4 w-72 z-40">
      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl p-5 shadow-2xl shadow-black/10 flex flex-col gap-4 animate-in slide-in-from-right duration-700">
        <div className="flex items-center gap-2 border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <Trophy size={20} className="text-yellow-500" />
          <h2 className="font-bold text-zinc-900 dark:text-zinc-50 uppercase tracking-widest text-sm">
            Top Claimers
          </h2>
        </div>
        
        <div className="flex flex-col gap-3">
          <AnimatePresence mode="popLayout">
            {leaderboard.length > 0 ? (
              leaderboard.map((player, idx) => (
                <motion.div
                  key={player.id}
                  layout
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex items-center justify-between gap-3 group"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-zinc-400 dark:text-zinc-600 font-bold text-xs w-4">
                      {idx + 1}
                    </span>
                    <div 
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: player.color }} 
                    />
                    <span className="text-zinc-700 dark:text-zinc-300 font-semibold text-sm truncate group-hover:text-zinc-900 dark:group-hover:text-zinc-50 transition-colors">
                      {player.name}
                    </span>
                  </div>
                  <div className="text-zinc-900 dark:text-white font-black text-sm bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-md min-w-[32px] text-center">
                    {player.score}
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-zinc-400 dark:text-zinc-600 text-xs italic py-4 text-center">
                Click tiles to claim them!
              </div>
            )}
          </AnimatePresence>
        </div>

        {leaderboard.length > 0 && (
          <div className="mt-2 text-[10px] uppercase font-bold text-zinc-400 dark:text-zinc-600 flex items-center gap-1.5 border-t border-zinc-200 dark:border-zinc-800 pt-3">
            <TrendingUp size={12} />
            Live updates enabled
          </div>
        )}
      </div>
    </div>
  );
}
