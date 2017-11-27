import { PLAYER, GAME_MASTER } from 'roles'

// Action Types

export const START_NEW_GAME = 'START_NEW_GAME';
export const START_NEW_GAME_SUCCESS = 'START_NEW_GAME_SUCCESS';
export const START_NEW_GAME_FAILURE = 'START_NEW_GAME_FAILURE';
export const JOIN_EXISTING_GAME = 'JOIN_EXISTING_GAME';
export const JOIN_EXISTING_GAME_SUCCESS = 'JOIN_EXISTING_GAME_SUCCESS';
export const JOIN_EXISTING_GAME_FAILURE = 'JOIN_EXISTING_GAME_FAILURE';
export const GAME_STATE_CHANGE = 'GAME_STATE_CHANGE';

// Actions

export function startNewGame(gameId, gameSettings) {
  return {
    type: START_NEW_GAME,
    payload: { gameId, gameSettings, clientRole: GAME_MASTER }
  };
}

export function startNewGameSuccess() {
  return {
    type: START_NEW_GAME_SUCCESS
  };
}

export function startNewGameFailure(failureMessage) {
  return {
    type: START_NEW_GAME_FAILURE,
    payload: { failureMessage }
  };
}

export function joinExistingGame(gameId, playerName) {
  return {
    type: JOIN_EXISTING_GAME,
    payload: { gameId, playerName, clientRole: PLAYER }
  };
}

export function joinExistingGameSuccess() {
  return {
    type: JOIN_EXISTING_GAME_SUCCESS
  };
}

export function joinExistingGameFailure(failureMessage) {
  return {
    type: JOIN_EXISTING_GAME_FAILURE,
    payload: { failureMessage }
  };
}

export function onGameStateChange(gameData) {
  return {
    type: GAME_STATE_CHANGE,
    payload: gameData
  };
}
