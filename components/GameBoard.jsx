'use client';

import React from 'react';
import Grid from './Grid';
import HUD from './HUD';
import Leaderboard from './Leaderboard';
import { MousePointer2, Sparkles } from 'lucide-react';

export default function GameBoard() {
  return (
    <div className="relative min-h-[100dvh] w-full flex items-center justify-center bg-[#fafafa] dark:bg-[#09090b] overflow-hidden p-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-10 mix-blend-multiply transition-opacity">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-300 dark:bg-blue-900 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-300 dark:bg-purple-900 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <HUD />
      <Leaderboard />

      <main className="relative z-10 w-full flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3 text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-[10px] font-black uppercase tracking-widest shadow-lg animate-bounce">
            <Sparkles size={12} fill="currentColor" />
            Live Pixel Canvas
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 to-zinc-500 dark:from-zinc-50 dark:to-zinc-500 tracking-tighter">
            PIXEL WARRIORS
          </h1>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 max-w-sm px-4">
            Click any pixel to claim it. The fastest clicker wins the board. 40x40 shared grid.
          </p>
        </div>

        <Grid />
        
        <div className="flex items-center gap-2 text-zinc-400 dark:text-zinc-600 text-[10px] font-bold uppercase tracking-widest mt-4">
          <MousePointer2 size={12} />
          Your progress is saved in real-time
        </div>
      </main>
    </div>
  );
}
