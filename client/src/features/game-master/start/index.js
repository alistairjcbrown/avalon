import { connect } from 'react-redux';
import { startGame } from 'actions/game';
import {
  clientRoleFor,
  gameIdFor,
  gameSettingsFor,
  gameFailureCodeFor,
  playersFor,
} from 'reducers';
import GameMasterStart from './components';

const mapStateToProps = state => ({
  clientRole: clientRoleFor(state),
  gameId: gameIdFor(state),
  gameSettings: gameSettingsFor(state),
  players: playersFor(state),
  failureCode: gameFailureCodeFor(state),
});

const mapDispatchToProps = dispatch => ({
  startGame: (gameId, clientRole) => dispatch(startGame(gameId, clientRole)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameMasterStart);
