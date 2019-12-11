import io from 'socket.io-client';
import {
  CONNECT,
  DISCONNECT,
  onConnected,
  onDisconnected,
} from 'actions/connection';
import {
  CREATE_NEW_GAME,
  JOIN_EXISTING_GAME,
  START_GAME,
  onGameStateChange,
  createNewGameSuccess,
  createNewGameFailure,
  joinExistingGameSuccess,
  joinExistingGameFailure,
  startGameSuccess,
  startGameFailure,
} from 'actions/game';
import config from '../../config';

let socket = null;

// eslint-disable-next-line consistent-return
export default store => next => action => {
  switch (action.type) {
    case CONNECT: {
      if (socket !== null) socket.close();

      socket = io(`http://${config.host}:${config.port}`);
      socket.on('connect', () => {
        store.dispatch(onConnected());
      });

      socket.on('disconnect', () => {
        store.dispatch(onDisconnected());
      });

      socket.on('game-state-change', gameData => {
        store.dispatch(onGameStateChange(gameData));
      });

      break;
    }

    case DISCONNECT: {
      socket.close();
      socket = null;

      break;
    }

    case CREATE_NEW_GAME: {
      const {
        gameId: id,
        gameSettings: settings,
        clientRole: role,
      } = action.payload;
      socket.emit('new-game', { id, settings, client: { role } }, response => {
        if (response.success) {
          store.dispatch(createNewGameSuccess());
        } else {
          store.dispatch(createNewGameFailure(response.error));
        }
      });
      return next(action);
    }

    case JOIN_EXISTING_GAME: {
      const { gameId: id, playerName: name, clientRole: role } = action.payload;
      socket.emit(
        'join-game',
        { id, player: { name }, client: { role } },
        response => {
          if (response.success) {
            store.dispatch(joinExistingGameSuccess());
          } else {
            store.dispatch(joinExistingGameFailure(response.error));
          }
        },
      );
      return next(action);
    }

    case START_GAME: {
      const { gameId: id, clientRole: role } = action.payload;
      socket.emit('start-game', { id, client: { role } }, response => {
        if (response.success) {
          store.dispatch(startGameSuccess());
        } else {
          store.dispatch(startGameFailure(response.error));
        }
      });
      return next(action);
    }

    default: {
      return next(action);
    }
  }
};
