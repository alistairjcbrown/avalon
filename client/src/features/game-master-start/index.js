import { connect } from 'react-redux'
import {
  clientRoleFor,
  gameIdFor,
  gameSettingsFor,
  playersFor
} from 'reducers';
import GameMasterStart from './components';

const mapStateToProps = (state) => {
  return {
    clientRole: clientRoleFor(state),
    gameId: gameIdFor(state),
    gameSettings: gameSettingsFor(state),
    players: playersFor(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMasterStart)
