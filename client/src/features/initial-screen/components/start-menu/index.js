import React, { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import { isValid } from '../../generate-game-id';
import './stylesheet.css';

function getDefaultGameId() {
  return queryString.parse(window.location.search).gameId;
}

class StartMenu extends Component {
  onJoinExistingGame = e => {
    e.preventDefault();

    const playerName = this.playerNameRef.value;
    const gameId = this.gameIdRef.value;
    if (!isValid(gameId)) return;

    const { onJoinExistingGame } = this.props;
    onJoinExistingGame(gameId, playerName);
  };

  onCreateNewGame = e => {
    e.preventDefault();
    const { onCreateNewGame } = this.props;
    onCreateNewGame({ numberOfPlayers: 5 });
  };

  setGameIdRef = gameIdRef => {
    this.gameIdRef = gameIdRef;
  };

  setPlayerNameRef = playerNameRef => {
    this.playerNameRef = playerNameRef;
  };

  onNameInputSubmission = e => {
    if (e.key === 'Enter') this.gameIdRef.focus();
  };

  checkInputSubmission = e => {
    if (e.key === 'Enter') this.onJoinExistingGame(e);
  };

  render() {
    return (
      <div className="start-menu">
        <div className="start-menu__join-game">
          <input
            ref={this.setPlayerNameRef}
            placeholder="Player name"
            onKeyPress={this.onNameInputSubmission}
          />
          <br />
          <input
            ref={this.setGameIdRef}
            placeholder="Game Id"
            maxLength={100}
            onKeyPress={this.checkInputSubmission}
            defaultValue={getDefaultGameId()}
          />
          <br />
          <button type="button" onClick={this.onJoinExistingGame}>
            Join an existing game
          </button>
        </div>

        <div className="start-menu__divider">
          <span>Or</span>
        </div>

        <div className="start-menu__new-game">
          <button type="button" onClick={this.onCreateNewGame}>
            Start a new game
          </button>
        </div>
      </div>
    );
  }
}

StartMenu.propTypes = {
  onJoinExistingGame: PropTypes.func.isRequired,
  onCreateNewGame: PropTypes.func.isRequired,
};

export default StartMenu;
