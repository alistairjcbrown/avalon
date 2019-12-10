import { connect } from 'react-redux';
import { clientRoleFor, gameIsJoinedFor, gameIsStartedFor } from 'reducers';
import { connect as makeConnection } from 'actions/connection';
import App from './component';

const mapStateToProps = state => ({
  role: clientRoleFor(state),
  isJoined: gameIsJoinedFor(state),
  isStarted: gameIsStartedFor(state),
});

const mapDispatchToProps = dispatch => ({
  makeConnection() {
    dispatch(makeConnection());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
