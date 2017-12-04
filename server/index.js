const server = require('http').createServer();
const io = require('socket.io')(server);
const config = require('../client/src/config');
const roles = require('../client/src/roles');

const clientData = {};
const gameData = {};
// TODO: Convert these to Maps and perhaps hide away behind util?

const getConnectedSocketIds = function (gameId) {
  const gameRoom = io.sockets.adapter.rooms[gameId];
  if (gameRoom) return Object.keys(gameRoom.sockets);
  return [];
};

const getGamePlayers = function (gameId) {
  return getConnectedSocketIds(gameId)
    .map((socketId) => clientData[socketId])
    .filter((client) => client.role === roles.PLAYER);
};

const alreadyInGame = function ({ name }, gameId) {
  return getGamePlayers(gameId).some(({ player }) => player.name === name);
};

const getGameState = function (gameId) {
  return {
    players: getGamePlayers(gameId),
    gameSettings: gameData[gameId]
  };
};

const outputState = function () {
  console.log('\n---------------');
  console.log('clientData', JSON.stringify(clientData, null, 4));
  console.log('');
  console.log('gameData', JSON.stringify(gameData, null, 4));
  console.log('');
  console.log(io.sockets.adapter.rooms);
  console.log('---------------\n');
};

io.on('connection', function (socket){
  console.log("Connected");

  socket.on('new-game', function ({ id: gameId, settings: gameSettings, client }, callback) {
    if (gameData[gameId]) {
      callback({ success: false, gameId, message: 'Game already exists' });
      return;
    }

    socket.join(gameId);
    gameData[gameId] = Object.assign({}, gameData[gameId], { id: gameId }, gameSettings);
    clientData[socket.id] = Object.assign({}, clientData[socket.id], client, { gameId });

    outputState();
    callback({ success: true, gameId });
  });

  socket.on('join-game', function ({ id: gameId, player, client }, callback) {
    if (!gameData[gameId]) {
      callback({ success: false, gameId, message: 'Game does not exist' });
      return;
    }

    if (alreadyInGame(player, gameId)) {
      callback({ success: false, gameId, message: 'Player already joined' });
      return;
    }

    if (getGamePlayers(gameId).length === gameData[gameId].numberOfPlayers) {
      callback({ success: false, gameId, message: 'Game is full' });
      return;
    }

    socket.join(gameId);
    clientData[socket.id] = Object.assign({}, clientData[socket.id], client, { gameId, player });

    io.to(gameId).emit('game-state-change', getGameState(gameId));

    outputState();
    callback({ success: true, gameId });
  });

  socket.on('disconnect', function () {
    if (clientData[socket.id]) {
      const { gameId } = clientData[socket.id];
      delete clientData[socket.id];

      // TODO: Check if the game is in the finished stated too
      // if (getConnectedSocketIds(gameId).length === 0) {
      //   delete gameData[gameId];
      // }
    }

    console.log("Disconnected");
  });
});

server.listen(config.port);