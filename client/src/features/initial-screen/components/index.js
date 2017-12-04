import React, { Component } from 'react';
import StartMenu from 'components/start-menu';
import './stylesheet.css';

class InitialScreen extends Component {
  renderFailureMessage() {
    if (!this.props.failureMessage) return null;
    return (
      <div className='initial-screen__failure'>
        Failed to connect to game, {this.props.failureMessage.toLowerCase()}
      </div>
    );
  }

  render() {
    return (
      <div className='initial-screen'>
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
