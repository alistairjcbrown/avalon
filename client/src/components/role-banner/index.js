import React, { Component } from 'react';
import { PLAYER, GAME_MASTER } from 'roles'

class StartScreen extends Component {
  renderRole(role) {
    if (role === GAME_MASTER) {
      return 'You are the game master of this game';
    } else if (role === PLAYER) {
      return `Hi ${this.props.playerName}, you are a player in this game`;
    } else {
      return 'You are a spectator';
    }
  }

  render() {
    return (
      <div className="role-banner">
        <span>{this.renderRole(this.props.role)}</span>
        {' '}
        <span>[Game Id: {this.props.gameId}]</span>
      </div>
    );
  }
}

export default StartScreen;
