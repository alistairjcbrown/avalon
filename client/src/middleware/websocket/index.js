import io from 'socket.io-client'
import config from '../../config';
import { CONNECT, DISCONNECT, onConnected, onDisconnected } from 'actions/connection';
import {
  START_NEW_GAME,
  JOIN_EXISTING_GAME,
  startNewGameSuccess,
  startNewGameFailure,
  joinExistingGameSuccess,
  joinExistingGameFailure,
  onGameStateChange
} from 'actions/game';

let socket = null;

export default (store) => (next) => (action) => {
  switch(action.type) {
    case CONNECT: {
      if (socket !== null) socket.close();

      socket = io(`${config.host}:${config.port}`);
      socket.on('connect', function () {
        store.dispatch(onConnected());
      });

      socket.on('disconnect', function () {
        store.dispatch(onDisconnected());
      });

      socket.on('game-state-change', function (gameData) {
        store.dispatch(onGameStateChange(gameData));
      });

      break;
    }

    case DISCONNECT: {
      socket.close();
      socket = null;

      break;
    }

    case START_NEW_GAME: {
      const { gameId: id, gameSettings: settings, clientRole: role } = action.payload;
      socket.emit('new-game', { id, settings, client: { role } }, function (response) {
        if (response.success) {
          store.dispatch(startNewGameSuccess());
        } else {
          store.dispatch(startNewGameFailure(response.message));
        }
      });
      return next(action);
    }

    case JOIN_EXISTING_GAME: {
      const { gameId: id, playerName: name, clientRole: role } = action.payload;
      socket.emit('join-game', { id, player: { name }, client: { role } }, function (response) {
        if (response.success) {
          store.dispatch(joinExistingGameSuccess());
        } else {
          store.dispatch(joinExistingGameFailure(response.message));
        }
      });
      return next(action);
    }

    default: {
      return next(action);
    }
  }
}
