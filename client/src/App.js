import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clientRoleFor, gameIsJoinedFor, gameIsStartedFor } from 'reducers';
import { connect as makeConnection } from 'actions/connection';
import { PLAYER, GAME_MASTER } from 'roles';

import InitialScreen from 'features/initial-screen';
import GameMasterStart from 'features/game-master-start';
import PlayerStart from 'features/player-start';
import GameMasterGame from 'features/game-master-game';
import PlayerGame from 'features/player-game';

import './stylesheet.css';

class App extends Component {
  componentDidMount() {
    this.props.makeConnection();
  }

  render() {
    const { state } = this.props;
    const role = clientRoleFor(state);
    const isJoined = gameIsJoinedFor(state);
    const isStarted = gameIsStartedFor(state);
    if (role === PLAYER && isStarted) return <PlayerGame />;
    if (role === GAME_MASTER && isStarted) return <GameMasterGame />;
    if (role === PLAYER && isJoined) return <PlayerStart />;
    if (role === GAME_MASTER && isJoined) return <GameMasterStart />;
    return <InitialScreen />;
  }
}

const mapStateToProps = (state) => ({ state });
const mapDispatchToProps = (dispatch) => {
  return {
    makeConnection() {
      dispatch(makeConnection());
    }
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App)
