import { connect } from 'react-redux';
import shortId from 'shortid';
import { createNewGame, joinExistingGame } from 'actions/game';
import { gameFailureMessageFor } from 'reducers';
import InitialScreen from './components';

const mapStateToProps = (state) => {
  return {
    failureMessage: gameFailureMessageFor(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onCreateNewGame(gameSettings) {
      const gameId = shortId.generate();
      dispatch(createNewGame(gameId, gameSettings))
    },

    onJoinExistingGame(gameId, playerName) {
      dispatch(joinExistingGame(gameId, playerName));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InitialScreen)
