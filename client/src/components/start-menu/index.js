import React, { Component } from 'react';
import shortId from 'shortid';

class StartScreen extends Component {
  onJoinExistingGame = (e) => {
    e.preventDefault();
    const playerName = 'unknown'; // TODO: need to get the users name
    const gameId = this.gameIdRef.value;
    if (!shortId.isValid(gameId)) return;
    this.props.onJoinExistingGame(gameId, playerName);
  }

  onStartNewGame = (e) => {
    e.preventDefault();
    this.props.onStartNewGame({ numberOfPlayers: 5 });
  }

  setGameIdRef = (gameIdRef) => {
    this.gameIdRef = gameIdRef;
  }

  checkInputSubmission = (e) => {
    if (e.key === 'Enter') this.onJoinExistingGame(e);
  }

  render() {
    return (
      <div className="initial-screen">
        <p>What would you like to do?</p>

        <p>
          <input
            ref={this.setGameIdRef}
            maxLength={14}
            onKeyPress={this.checkInputSubmission}
          />
          <br />
          <a href='#' onClick={this.onJoinExistingGame}>
            Join an existing game
          </a>
        </p>

        <p>--- Or ---</p>

        <p>
          <a href='#' onClick={this.onStartNewGame}>
            Start a new game
          </a>
        </p>
      </div>
    );
  }
}

export default StartScreen;
