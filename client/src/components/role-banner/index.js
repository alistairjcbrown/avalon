import React, { Component } from 'react';
import { SPECTATOR, PLAYER, GAME_MASTER } from 'roles'
import './stylesheet.css';

class StartScreen extends Component {
  renderRole(role) {
    switch (role) {
      case GAME_MASTER:
        return 'You are the game master of this game';

      case PLAYER:
        return 'You are a player in this game';

      case SPECTATOR:
        return 'You are a spectator';

      default:
        return 'Unknown role';
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
