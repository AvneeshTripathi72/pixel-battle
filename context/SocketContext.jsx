'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { nanoid } from 'nanoid';

const SocketContext = createContext();

const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
});

export function SocketProvider({ children }) {
  const [user, setUser] = useState(null);
  const [grid, setGrid] = useState([]);
  const [onlineCount, setOnlineCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const adjs = ['Swift', 'Neon', 'Cool', 'Epic', 'Turbo', 'Hyper', 'Nova', 'Flash'];
    const nouns = ['Pixel', 'Cursor', 'Gamer', 'Bot', 'Wiz', 'Ghost', 'Sonic', 'Rider'];
    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8'];
    
    const guestUser = {
      id: nanoid(10),
      name: `${adjs[Math.floor(Math.random() * adjs.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(Math.random() * 99)}`,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    setUser(guestUser);
    
    fetch('/api/pixel')
      .then(res => res.json())
      .then(data => {
        if (data.grid) setGrid(data.grid);
        if (data.leaderboard) setLeaderboard(data.leaderboard);
        setIsConnected(true);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setIsConnected(false);
      });

    const channel = pusher.subscribe('pixel-canvas');
    
    channel.bind('tileUpdate', (data) => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        if (data.tile && data.tile.id < newGrid.length) {
          newGrid[data.tile.id] = data.tile;
        }
        return newGrid;
      });
      if (data.leaderboard) setLeaderboard(data.leaderboard);
    });

    return () => {
      pusher.unsubscribe('pixel-canvas');
    };
  }, []);

  const handleTileClick = async (tileId) => {
    if (!user) return;

    setGrid((prev) => {
      const next = [...prev];
      next[tileId] = { ...next[tileId], color: user.color, ownerName: user.name };
      return next;
    });

    try {
      const res = await fetch('/api/click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tileId, user })
      });
      
      if (!res.ok) throw new Error('Update failed');
    } catch (err) {
      console.error('Action failed:', err);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        user,
        grid,
        onlineCount,
        leaderboard,
        isConnected,
        handleTileClick,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
