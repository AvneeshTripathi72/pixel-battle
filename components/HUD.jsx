'use client';

import React from 'react';
import { useSocket } from '../context/SocketContext';
import { Users, User, Circle } from 'lucide-react';

export default function HUD() {
  const { user, onlineCount, isConnected } = useSocket();

  const name = user?.name || 'Connecting...';
  const color = user?.color || '#e4e4e7';

  return (
    <div className="fixed top-4 left-4 right-4 z-50 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-2 shadow-xl shadow-black/5 animate-in slide-in-from-top duration-500">
        <div className="flex items-center gap-2">
          <div 
            className="w-4 h-4 rounded-full shadow-lg" 
            style={{ backgroundColor: color }} 
          />
          <span className="font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            {name}
          </span>
        </div>
        <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 mx-1" />
        <div className="flex items-center gap-1.5 text-zinc-500 dark:text-zinc-400 font-medium">
          <Users size={16} />
          <span>{onlineCount} online</span>
        </div>
      </div>

      <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 rounded-2xl px-4 py-2 shadow-xl shadow-black/5 flex items-center gap-2 animate-in slide-in-from-top duration-500">
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
        <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
          {isConnected ? 'LIVE' : 'DISCONNECTED'}
        </span>
      </div>
    </div>
  );
}
