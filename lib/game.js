import { kv } from '@vercel/kv';

export const GRID_SIZE = 40;
const GRID_KEY = 'pixel-grid';

export async function getGrid() {
  const cached = await kv.get(GRID_KEY);
  if (cached) return cached;

  const initialGrid = Array(GRID_SIZE * GRID_SIZE).fill(null).map((_, index) => ({
    id: index,
    color: '#ffffff',
    owner: null,
    ownerName: null,
    timestamp: Date.now()
  }));

  await kv.set(GRID_KEY, initialGrid);
  return initialGrid;
}

export async function updateTile(tileId, user) {
  const grid = await getGrid();
  
  if (tileId < 0 || tileId >= grid.length) return null;

  const tile = {
    ...grid[tileId],
    color: user.color,
    owner: user.id,
    ownerName: user.name,
    timestamp: Date.now()
  };

  grid[tileId] = tile;
  await kv.set(GRID_KEY, grid);
  
  return tile;
}

export async function getLeaderboard() {
  const grid = await getGrid();
  const scores = new Map();
  
  grid.forEach(tile => {
    if (tile.owner) {
      scores.set(tile.owner, {
        name: tile.ownerName,
        color: tile.color,
        count: (scores.get(tile.owner)?.count || 0) + 1
      });
    }
  });

  return Array.from(scores.entries())
    .map(([id, info]) => ({
      id,
      name: info.name,
      color: info.color,
      score: info.count
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}
