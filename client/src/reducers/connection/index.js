import { CONNECTED, DISCONNECTED } from 'actions/connection';

// Selectors

export const isConnectedFor = ({ isConnected }) => isConnected;

// Reducers

const defaultState = {
  isConnected: false,
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case CONNECTED: {
      return { ...state, isConnected: true };
    }

    case DISCONNECTED: {
      return { ...state, isConnected: false };
    }

    default:
      return state;
  }
}
