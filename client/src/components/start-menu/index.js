import React, { Component } from 'react';
import queryString from 'query-string';
import shortId from 'shortid';
import './stylesheet.css';

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

  getDefaultGameId() {
    return queryString.parse(window.location.search).gameId;
  }

  render() {
    return (
      <div className="start-menu">
        <div className="start-menu__join-game">
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
            defaultValue={this.getDefaultGameId()}
          />
          <br />
          <button onClick={this.onJoinExistingGame}>
            Join an existing game
          </button>
        </div>

        <div className="start-menu__divider"><span>Or</span></div>

        <div className="start-menu__new-game">
          <button onClick={this.onStartNewGame}>
            Start a new game
          </button>
        </div>
      </div>
    );
  }
}

export default StartScreen;
