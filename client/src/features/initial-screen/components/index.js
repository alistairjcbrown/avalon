import React, { Component } from 'react';
import StartMenu from 'components/start-menu';

class InitialScreen extends Component {
  render() {
    return (
      <StartMenu
        onStartNewGame={this.props.onStartNewGame}
        onJoinExistingGame={this.props.onJoinExistingGame}
      />
    );
  }
}

export default InitialScreen;
