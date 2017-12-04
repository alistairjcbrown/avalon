import React, { Component } from 'react';
import { PLAYER, GAME_MASTER } from 'roles'
import './stylesheet.css';

class StartScreen extends Component {
  renderRole(role) {
    if (role === GAME_MASTER) {
      return 'You are the game master of this game';
    } else if (role === PLAYER) {
      return 'You are a player in this game';
    } else {
      return 'You are a spectator';
    }
  }

  render() {
    return (
      <div className="role-banner">
        <span className="role-banner__role">
          {this.renderRole(this.props.role)}
        </span>
        <span className="role-banner__game">
          [Game Id: {this.props.gameId}]
        </span>
      </div>
    );
  }
}

export default StartScreen;
