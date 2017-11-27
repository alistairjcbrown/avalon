import { START_NEW_GAME, JOIN_EXISTING_GAME } from 'actions/game';

// Selectors

export const roleFor = ({ role }) => role;

// Reducers

const defaultState = {};

export default function(state = defaultState, action) {
  switch (action.type) {
    case START_NEW_GAME:
    case JOIN_EXISTING_GAME: {
      const { clientRole: role } = action.payload;
      return { ...state, role };
    }

    default:
      return state;
  }
}
