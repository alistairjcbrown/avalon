import { PLAYER, GAME_MASTER } from 'roles'

// Action Types

export const START_NEW_GAME = 'START_NEW_GAME';
export const JOIN_EXISTING_GAME = 'JOIN_EXISTING_GAME';

// Actions

export function startNewGame(gameId, gameSettings) {
  return {
    type: START_NEW_GAME,
    payload: { gameId, gameSettings, clientRole: GAME_MASTER }
  };
}

export function joinExistingGame(gameId, playerName) {
  return {
    type: JOIN_EXISTING_GAME,
    payload: { gameId, playerName, clientRole: PLAYER }
  };
}
