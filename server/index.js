const server = require('http').createServer();
const io = require('socket.io')(server);
const config = require('../client/src/config');
const roles = require('../client/src/roles');

const clientData = {};
const gameData = {};
// TODO: Convert these to Maps and perhaps hide away behind util?

const alreadyInGame = function ({ name }, gameId) {
  const gameRoom = io.sockets.adapter.rooms[gameId];
  const players = Object.keys(gameRoom.sockets).map((socketId) => clientData[socketId]);
  return players.some(({ role, player }) => role === roles.PLAYER && player.name === name);
}

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

  socket.on('new-game', function ({ id: gameId, settings: gameSettings, client }) {
    // if (gameData[gameId]) // ERROR: Game already exists

    socket.join(gameId);
    gameData[gameId] = Object.assign({}, gameData[gameId], { id: gameId }, gameSettings);
    clientData[socket.id] = Object.assign({}, clientData[socket.id], client);

    outputState();
  });

  socket.on('join-game', function ({ id: gameId, player, client }) {
    // if (gameData[gameId]) // ERROR: Game does not exist yet
    // if (alreadyInGame(player, gameId)) // ERROR: player already exists

    socket.join(gameId);
    clientData[socket.id] = Object.assign({}, clientData[socket.id], client, { player });

    outputState();
  });

  socket.on('disconnect', function () {
    delete clientData[socket.id];

    // TODO: Once last player leaves, remove the game data
    console.log("Disconnected");
  });
});

server.listen(config.port);
