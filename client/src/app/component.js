import React, { Component } from 'react';
import PropTypes from 'prop-types';
import constants from 'shared-constants';

import InitialScreen from 'features/initial-screen';
import GameMasterStart from 'features/game-master/start';
import GameMasterGame from 'features/game-master/game';
import PlayerStart from 'features/player/start';
import PlayerGame from 'features/player/game';

import './stylesheet.css';

const { SPECTATOR, PLAYER, GAME_MASTER } = constants.roles;

class App extends Component {
  componentDidMount() {
    const { makeConnection } = this.props;
    makeConnection();
  }

  render() {
    const { role, isJoined, isStarted } = this.props;

    if (role === PLAYER) {
      if (isStarted) return <PlayerGame />;
      if (isJoined) return <PlayerStart />;
    }

    if (role === GAME_MASTER) {
      if (isStarted) return <GameMasterGame />;
      if (isJoined) return <GameMasterStart />;
    }

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
