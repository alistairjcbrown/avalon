import { JOIN_EXISTING_GAME } from 'actions/game';

// Selectors

export const nameFor = ({ name }) => name;

// Reducers

const defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case JOIN_EXISTING_GAME: {
      const { playerName: name } = action.payload;
      return { ...state, name };
    }

    default:
      return state;
  }
}
