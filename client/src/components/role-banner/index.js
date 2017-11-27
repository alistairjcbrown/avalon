import React, { Component } from 'react';
import { PLAYER, GAME_MASTER } from 'roles'

class StartScreen extends Component {
  renderRole(role) {
    if (role === GAME_MASTER) {
      return 'You are the game master';
    } else if (role === PLAYER) {
      return 'You are a player';
    } else {
      return 'You are a spectator';
    }
  }

  render() {
    return (
      <div className="role-banner">
        <span>{this.renderRole(this.props.role)}</span>
        {' - '}
        <span>Joined game {this.props.gameId}</span>
      </div>
    );
  }
}

export default StartScreen;
