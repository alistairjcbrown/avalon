import React, { Component } from 'react';
import shortId from 'shortid';

class StartScreen extends Component {
  onJoinExistingGame = (e) => {
    e.preventDefault();
    const playerName = this.playerNameRef.value;
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

  setPlayerNameRef = (playerNameRef) => {
    this.playerNameRef = playerNameRef;
  }

  checkInputSubmission = (e) => {
    if (e.key === 'Enter') this.onJoinExistingGame(e);
  }

  onNameInputSubmission = (e) => {
    if (e.key === 'Enter') this.gameIdRef.focus();
  }

  render() {
    return (
      <div className="initial-screen">
        <p>What would you like to do?</p>

        <p>
          <input
            ref={this.setPlayerNameRef}
            placeholder='Player name'
            onKeyPress={this.onNameInputSubmission}
          />
          <br />
          <input
            ref={this.setGameIdRef}
            placeholder='Game Id'
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
