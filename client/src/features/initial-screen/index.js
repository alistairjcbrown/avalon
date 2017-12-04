import { connect } from 'react-redux';
import shortId from 'shortid';
import { startNewGame, joinExistingGame } from 'actions/game';
import { gameFailureMessageFor } from 'reducers';
import InitialScreen from './components';

const mapStateToProps = (state) => {
  return {
    failureMessage: gameFailureMessageFor(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onStartNewGame(gameSettings) {
      const gameId = shortId.generate();
      dispatch(startNewGame(gameId, gameSettings))
    },

    onJoinExistingGame(gameId, playerName) {
      dispatch(joinExistingGame(gameId, playerName));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen)