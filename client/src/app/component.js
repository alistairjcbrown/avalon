import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { SPECTATOR, PLAYER, GAME_MASTER } from 'roles';

import InitialScreen from 'features/initial-screen';
import GameMasterStart from 'features/game-master-start';
import PlayerStart from 'features/player-start';
import GameMasterGame from 'features/game-master-game';
import PlayerGame from 'features/player-game';

import './stylesheet.css';

class App extends Component {
  componentDidMount() {
    const { makeConnection } = this.props;
    makeConnection();
  }

  render() {
    const { role, isJoined, isStarted } = this.props;
    if (role === PLAYER && isStarted) return <PlayerGame />;
    if (role === GAME_MASTER && isStarted) return <GameMasterGame />;
    if (role === PLAYER && isJoined) return <PlayerStart />;
    if (role === GAME_MASTER && isJoined) return <GameMasterStart />;
    return <InitialScreen />;
  }
}

App.propTypes = {
  makeConnection: PropTypes.func.isRequired,
  role: PropTypes.oneOf([SPECTATOR, PLAYER, GAME_MASTER]),
  isJoined: PropTypes.bool.isRequired,
  isStarted: PropTypes.bool.isRequired,
};

App.defaultProps = {
  role: undefined,
};

export default App;
