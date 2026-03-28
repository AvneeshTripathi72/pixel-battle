const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { Server } = require('socket.io');
const { grid, users, addUser, removeUser, handleTileClick, getLeaderboard } = require('./lib/gameState');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Assign random user props
    const user = addUser(socket.id);
    socket.emit('init', { grid, user, onlineCount: users.size });
    
    // Broadcast online count update
    io.emit('onlineCount', users.size);
    io.emit('leaderboard', getLeaderboard());

    socket.on('tileClick', (tileId) => {
      const updatedTile = handleTileClick(tileId, socket.id);
      if (updatedTile) {
        io.emit('tileUpdate', updatedTile);
        io.emit('leaderboard', getLeaderboard());
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      removeUser(socket.id);
      io.emit('onlineCount', users.size);
      io.emit('leaderboard', getLeaderboard());
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
