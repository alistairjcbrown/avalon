import constants from 'shared-constants';

const {
  GAME_ALREADY_EXISTS,
  GAME_DOES_NOT_EXIST,
  PLAYER_ALREADY_JOINED,
  GAME_FULL,
  START_GAME_MASTER,
  START_MISSING_PLAYERS,
} = constants.serverErrors;

function getFailureMessage(failureCode) {
  switch (failureCode) {
    case GAME_ALREADY_EXISTS:
      return 'Game already exists';
    case GAME_DOES_NOT_EXIST:
      return 'Game does not exist';
    case PLAYER_ALREADY_JOINED:
      return 'This player has already joined';
    case GAME_FULL:
      return 'The game is full';
    case START_GAME_MASTER:
      return 'Only the game master can start the game';
    case START_MISSING_PLAYERS:
      return 'The game must have all players before starting';
    default:
      return 'An unknown error occurred';
  }
}

export default getFailureMessage;
