import React, { Component } from 'react';
import StartMenu from 'components/start-menu';

class InitialScreen extends Component {
  renderFailureMessage() {
    if (!this.props.failureMessage) return null;
    return (
      <div>
        Failed to connect to game, {this.props.failureMessage.toLowerCase()}
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.renderFailureMessage()}
        <StartMenu
          onStartNewGame={this.props.onStartNewGame}
          onJoinExistingGame={this.props.onJoinExistingGame}
        />
      </div>
    );
  }
}

export default InitialScreen;
