import { connect } from 'react-redux'
import { startGame } from 'actions/game';
import {
  clientRoleFor,
  gameIdFor,
  gameSettingsFor,
  gameFailureMessageFor,
  playersFor
} from 'reducers';
import GameMasterStart from './components';

const mapStateToProps = (state) => {
  return {
    clientRole: clientRoleFor(state),
    gameId: gameIdFor(state),
    gameSettings: gameSettingsFor(state),
    players: playersFor(state),
    failureMessage: gameFailureMessageFor(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    startGame: (gameId, clientRole) => dispatch(startGame(gameId, clientRole))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMasterStart)
