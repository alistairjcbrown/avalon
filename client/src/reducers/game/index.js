import { START_NEW_GAME, JOIN_EXISTING_GAME } from 'actions/game';

// Selectors

export const idFor = ({ id }) => id;

// Reducers

const defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case START_NEW_GAME: {
      const { gameId: id, gameSettings: { numberOfPlayers } } = action.payload;
      return { ...state, id, numberOfPlayers };
    }

    case JOIN_EXISTING_GAME: {
      const { gameId: id } = action.payload;
      return { ...state, id };
    }

    default:
      return state;
  }
}
