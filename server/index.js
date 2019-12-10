/* eslint-disable no-console */

const server = require('http').createServer();
const io = require('socket.io')(server);
const config = require('../client/src/config');
const roles = require('../client/src/roles');
const states = require('../client/src/states');

const clientData = {};
const gameData = {};
// TODO: Convert these to Maps and perhaps hide away behind util?

const getConnectedSocketIds = gameId => {
  const gameRoom = io.sockets.adapter.rooms[gameId];
  if (gameRoom) return Object.keys(gameRoom.sockets);
  return [];
};

const getGamePlayers = gameId =>
  getConnectedSocketIds(gameId)
    .map(socketId => clientData[socketId])
    .filter(client => client.role === roles.PLAYER);

const alreadyInGame = ({ name }, gameId) =>
  getGamePlayers(gameId).some(({ player }) => player.name === name);

const getGameData = gameId => gameData[gameId] || {};

const getGameState = gameId => ({
  players: getGamePlayers(gameId),
  gameSettings: getGameData(gameId),
});

const outputState = () => {
  console.log('\n---------------');
  console.log('clientData', JSON.stringify(clientData, null, 4));
  console.log('');
  console.log('gameData', JSON.stringify(gameData, null, 4));
  console.log('');
  console.log(io.sockets.adapter.rooms);
  console.log('---------------\n');
};

io.on('connection', socket => {
  console.log('Connected');

  socket.on(
    'new-game',
    ({ id: gameId, settings: gameSettings, client }, callback) => {
      if (gameData[gameId]) {
        callback({ success: false, gameId, message: 'Game already exists' });
        return;
      }

      socket.join(gameId);
      gameData[gameId] = {
        ...getGameData(gameId),
        ...gameSettings,
        id: gameId,
        state: states.UNSTARTED,
      };
      clientData[socket.id] = { ...clientData[socket.id], ...client, gameId };

      outputState();
      callback({ success: true, gameId });
    },
  );

  socket.on('join-game', ({ id: gameId, player, client }, callback) => {
    if (!gameData[gameId]) {
      callback({ success: false, gameId, message: 'Game does not exist' });
      return;
    }

    if (alreadyInGame(player, gameId)) {
      callback({ success: false, gameId, message: 'Player already joined' });
      return;
    }

    if (getGamePlayers(gameId).length === getGameData(gameId).numberOfPlayers) {
      callback({ success: false, gameId, message: 'Game is full' });
      return;
    }

    socket.join(gameId);
    clientData[socket.id] = {
      ...clientData[socket.id],
      ...client,
      gameId,
      player,
    };

    io.to(gameId).emit('game-state-change', getGameState(gameId));

    outputState();
    callback({ success: true, gameId });
  });

  socket.on('start-game', ({ id: gameId, client }, callback) => {
    if (client.role !== roles.GAME_MASTER) {
      callback({
        success: false,
        gameId,
        message: 'Only the game master can start the game',
      });
      return;
    }

    if (getGamePlayers(gameId).length !== getGameData(gameId).numberOfPlayers) {
      callback({
        success: false,
        gameId,
        message: 'Game must have all players',
      });
      return;
    }

    gameData[gameId] = {
      ...getGameData(gameId),
      id: gameId,
      state: states.STARTED,
    };

    io.to(gameId).emit('game-state-change', getGameState(gameId));

    outputState();
    callback({ success: true, gameId });
  });

  socket.on('disconnect', () => {
    if (clientData[socket.id]) {
      const { gameId } = clientData[socket.id];

      if (getGameData(gameId).state === states.UNSTARTED) {
        delete clientData[socket.id];
        io.to(gameId).emit('game-state-change', getGameState(gameId));
      }

      // TODO: Check if the game is in the finished state too
      // if (getConnectedSocketIds(gameId).length === 0) {
      //   delete gameData[gameId];
      // }
    }

    console.log('Disconnected');
  });
});

server.listen(config.port);
