import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import connection, * as fromConnection from './connection';
import game, * as fromGame from './game';
import client, * as fromClient from './client';
import player, * as fromPlayer from './player';

const connectionFor = ({ connection }) => connection;
const gameFor = ({ game }) => game;
const clientFor = ({ client }) => client;
const playerFor = ({ player }) => player;

export const isConnectedFor = createSelector(
  connectionFor,
  fromConnection.isConnectedFor,
);

export const gameIdFor = createSelector(
  gameFor,
  fromGame.idFor
);

export const gameSettingsFor = createSelector(
  gameFor,
  fromGame.settingsFor
);

export const gameIsJoinedFor = createSelector(
  gameFor,
  fromGame.isJoinedFor
);

export const gameFailureMessageFor = createSelector(
  gameFor,
  fromGame.failureMessageFor
);

export const playersFor = createSelector(
  gameFor,
  fromGame.playersFor
);

export const clientRoleFor = createSelector(
  clientFor,
  fromClient.roleFor
);

export const playerNameFor = createSelector(
  playerFor,
  fromPlayer.nameFor
);

export default combineReducers({
  connection,
  game,
  client,
  player
});
