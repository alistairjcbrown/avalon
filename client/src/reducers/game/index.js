import {
  START_NEW_GAME,
  START_NEW_GAME_SUCCESS,
  START_NEW_GAME_FAILURE,
  JOIN_EXISTING_GAME,
  JOIN_EXISTING_GAME_SUCCESS,
  JOIN_EXISTING_GAME_FAILURE,
  GAME_STATE_CHANGE
} from 'actions/game';

// Selectors

export const idFor = ({ id }) => id;
export const settingsFor = ({ settings }) => settings;
export const playersFor = ({ players }) => players;
export const isJoinedFor = ({ isJoined }) => isJoined;
export const failureMessageFor = ({ failureMessage }) => failureMessage;

// Reducers

const defaultState = {
  isJoined: false
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case START_NEW_GAME: {
      const { gameId: id, gameSettings: settings } = action.payload;
      return { ...state, id, settings };
    }

    case START_NEW_GAME_SUCCESS: {
      return { ...state, isJoined: true };
    }

    case START_NEW_GAME_FAILURE: {
      const { failureMessage } = action.payload;
      return { ...state, isJoined: false, failureMessage };
    }

    case JOIN_EXISTING_GAME: {
      const { gameId: id } = action.payload;
      return { ...state, id };
    }

    case JOIN_EXISTING_GAME_SUCCESS: {
      return { ...state, isJoined: true };
    }

    case JOIN_EXISTING_GAME_FAILURE: {
      const { failureMessage } = action.payload;
      return { ...state, isJoined: false, failureMessage };
    }

    case GAME_STATE_CHANGE: {
      const { players, gameSettings: settings } = action.payload;
      return { ...state, settings, players };
    }

    default:
      return state;
  }
}
