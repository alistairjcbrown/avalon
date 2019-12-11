import states from 'states';
import {
  GAME_STATE_CHANGE,
  CREATE_NEW_GAME,
  CREATE_NEW_GAME_SUCCESS,
  CREATE_NEW_GAME_FAILURE,
  JOIN_EXISTING_GAME,
  JOIN_EXISTING_GAME_SUCCESS,
  JOIN_EXISTING_GAME_FAILURE,
  START_GAME,
  START_GAME_SUCCESS,
  START_GAME_FAILURE,
} from 'actions/game';

// Selectors

export const idFor = ({ id }) => id;
export const settingsFor = ({ settings }) => settings;
export const playersFor = ({ players }) => players;
export const isJoinedFor = ({ isJoined }) => isJoined;
export const isStartedFor = state =>
  (settingsFor(state) || {}).state === states.STARTED;
export const failureCodeFor = ({ failureCode }) => failureCode;

// Reducers

const defaultState = {
  isJoined: false,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case GAME_STATE_CHANGE: {
      const { players, gameSettings: settings } = action.payload;
      return { ...state, settings, players };
    }

    case CREATE_NEW_GAME: {
      const { gameId: id, gameSettings: settings } = action.payload;
      return { ...state, id, settings };
    }

    case CREATE_NEW_GAME_SUCCESS: {
      return { ...state, isJoined: true };
    }

    case CREATE_NEW_GAME_FAILURE: {
      const { failureCode } = action.payload;
      return { ...state, isJoined: false, failureCode };
    }

    case JOIN_EXISTING_GAME: {
      const { gameId: id } = action.payload;
      return { ...state, id };
    }

    case JOIN_EXISTING_GAME_SUCCESS: {
      return { ...state, isJoined: true };
    }

    case JOIN_EXISTING_GAME_FAILURE: {
      const { failureCode } = action.payload;
      return { ...state, isJoined: false, failureCode };
    }

    case START_GAME: {
      return state;
    }

    case START_GAME_SUCCESS: {
      return { ...state, isStarted: true };
    }

    case START_GAME_FAILURE: {
      const { failureCode } = action.payload;
      return { ...state, isStarted: false, failureCode };
    }

    default:
      return state;
  }
}
