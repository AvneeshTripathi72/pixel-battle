'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export function SocketProvider({ children }) {
  const INITIAL_GRID = Array(40 * 40).fill(null).map((_, index) => ({
    id: index,
    color: '#ffffff',
    owner: null,
    ownerName: null,
  }));

  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [grid, setGrid] = useState(INITIAL_GRID);
  const [onlineCount, setOnlineCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io();

    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server!');
    });

    socketInstance.on('init', (data) => {
      setGrid(data.grid);
      setUser(data.user);
      setOnlineCount(data.onlineCount);
    });

    socketInstance.on('onlineCount', (count) => {
      setOnlineCount(count);
    });

    socketInstance.on('leaderboard', (data) => {
      setLeaderboard(data);
    });

    socketInstance.on('tileUpdate', (updatedTile) => {
      setGrid((prevGrid) => {
        const newGrid = [...prevGrid];
        newGrid[updatedTile.id] = updatedTile;
        return newGrid;
      });
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const handleTileClick = (tileId) => {
    if (socket && isConnected) {
      socket.emit('tileClick', tileId);
    }
  };

  return (
    <SocketContext.Provider
      value={{
        socket,
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
