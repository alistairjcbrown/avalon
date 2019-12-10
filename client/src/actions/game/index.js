import { PLAYER, GAME_MASTER } from 'roles';

// Action Types

export const GAME_STATE_CHANGE = 'GAME_STATE_CHANGE';
export const CREATE_NEW_GAME = 'CREATE_NEW_GAME';
export const CREATE_NEW_GAME_SUCCESS = 'CREATE_NEW_GAME_SUCCESS';
export const CREATE_NEW_GAME_FAILURE = 'CREATE_NEW_GAME_FAILURE';
export const JOIN_EXISTING_GAME = 'JOIN_EXISTING_GAME';
export const JOIN_EXISTING_GAME_SUCCESS = 'JOIN_EXISTING_GAME_SUCCESS';
export const JOIN_EXISTING_GAME_FAILURE = 'JOIN_EXISTING_GAME_FAILURE';
export const START_GAME = 'START_GAME';
export const START_GAME_SUCCESS = 'START_GAME_SUCCESS';
export const START_GAME_FAILURE = 'START_GAME_FAILURE';

// Actions

export function onGameStateChange(gameData) {
  return {
    type: GAME_STATE_CHANGE,
    payload: gameData,
  };
}

export function createNewGame(gameId, gameSettings) {
  return {
    type: CREATE_NEW_GAME,
    payload: { gameId, gameSettings, clientRole: GAME_MASTER },
  };
}

export function createNewGameSuccess() {
  return {
    type: CREATE_NEW_GAME_SUCCESS,
  };
}

export function createNewGameFailure(failureMessage) {
  return {
    type: CREATE_NEW_GAME_FAILURE,
    payload: { failureMessage },
  };
}

export function joinExistingGame(gameId, playerName) {
  return {
    type: JOIN_EXISTING_GAME,
    payload: { gameId, playerName, clientRole: PLAYER },
  };
}

export function joinExistingGameSuccess() {
  return {
    type: JOIN_EXISTING_GAME_SUCCESS,
  };
}

export function joinExistingGameFailure(failureMessage) {
  return {
    type: JOIN_EXISTING_GAME_FAILURE,
    payload: { failureMessage },
  };
}

export function startGame(gameId, clientRole) {
  return {
    type: START_GAME,
    payload: { gameId, clientRole },
  };
}

export function startGameSuccess() {
  return {
    type: START_GAME_SUCCESS,
  };
}

export function startGameFailure(failureMessage) {
  return {
    type: START_GAME_FAILURE,
    payload: { failureMessage },
  };
}
