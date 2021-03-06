import { connect } from 'react-redux';
import {
  clientRoleFor,
  gameIdFor,
  gameSettingsFor,
  playersFor,
  playerNameFor,
} from 'reducers';
import PlayerStart from './components';

const mapStateToProps = state => ({
  clientRole: clientRoleFor(state),
  gameId: gameIdFor(state),
  gameSettings: gameSettingsFor(state),
  players: playersFor(state),
  playerName: playerNameFor(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerStart);
