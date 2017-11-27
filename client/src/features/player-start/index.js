import { connect } from 'react-redux'
import { clientRoleFor, gameIdFor, playerNameFor } from 'reducers';
import PlayerStart from './components';

const mapStateToProps = (state) => {
  return {
    clientRole: clientRoleFor(state),
    gameId: gameIdFor(state),
    playerName: playerNameFor(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayerStart)
