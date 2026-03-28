// Game state store

const GRID_SIZE = 40;

// Initialize grid with white tiles
const grid = Array(GRID_SIZE * GRID_SIZE).fill(null).map((_, index) => ({
  id: index,
  color: '#ffffff',
  owner: null,
  ownerName: null,
  timestamp: Date.now()
}));

const users = new Map();

const colors = [
  '#FF5733', '#33FF57', '#3357FF', '#F333FF', '#FF33A8',
  '#33FFF5', '#FF8633', '#8633FF', '#33FF86', '#FFD433'
];

function getRandomUserProps() {
  const adjs = ['Swift', 'Neon', 'Cool', 'Epic', 'Turbo', 'Hyper', 'Nova', 'Flash'];
  const nouns = ['Pixel', 'Cursor', 'Gamer', 'Bot', 'Wiz', 'Ghost', 'Sonic', 'Rider'];
  
  const name = `${adjs[Math.floor(Math.random() * adjs.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${Math.floor(Math.random() * 1000)}`;
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  return { name, color };
}

function handleTileClick(tileId, userId) {
  const user = users.get(userId);
  if (!user) return null;

  if (tileId < 0 || tileId >= grid.length) return null;

  const tile = grid[tileId];
  tile.color = user.color;
  tile.owner = userId;
  tile.ownerName = user.name;
  tile.timestamp = Date.now();

  return tile;
}

function addUser(socketId) {
  const props = getRandomUserProps();
  const user = {
    id: socketId,
    ...props,
    score: 0
  };
  users.set(socketId, user);
  return user;
}

function removeUser(socketId) {
  users.delete(socketId);
}

function getLeaderboard() {
  const scores = new Map();
  
  // Count tiles per user (currently active users)
  grid.forEach(tile => {
    if (tile.owner && users.has(tile.owner)) {
      scores.set(tile.owner, (scores.get(tile.owner) || 0) + 1);
    }
  });

  return Array.from(scores.entries())
    .map(([id, score]) => ({
      id,
      name: users.get(id).name,
      color: users.get(id).color,
      score
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);
}

module.exports = {
  grid,
  users,
  handleTileClick,
  addUser,
  removeUser,
  getLeaderboard,
  GRID_SIZE
};
