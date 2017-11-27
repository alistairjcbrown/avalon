import { connect } from 'react-redux'
import { clientRoleFor, gameIdFor } from 'reducers';
import GameMasterStart from './components';

const mapStateToProps = (state) => {
  return {
    clientRole: clientRoleFor(state),
    gameId: gameIdFor(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMasterStart)
