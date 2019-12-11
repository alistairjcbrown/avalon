import { connect } from 'react-redux';
import { createNewGame, joinExistingGame } from 'actions/game';
import { gameFailureCodeFor } from 'reducers';
import generateGameId from './generate-game-id';
import InitialScreen from './components';

const mapStateToProps = state => ({
  failureCode: gameFailureCodeFor(state),
});

const mapDispatchToProps = dispatch => ({
  onCreateNewGame(gameSettings) {
    dispatch(createNewGame(generateGameId(), gameSettings));
  },

  onJoinExistingGame(gameId, playerName) {
    dispatch(joinExistingGame(gameId, playerName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen);
