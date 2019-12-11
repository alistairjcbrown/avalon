import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Planet } from 'react-kawaii';
import QRCode from 'qrcode.react';
import roles from 'roles';
import serverErrors from 'server-errors';
import getFailureMessage from 'get-failure-message';
import RoleBanner from 'components/role-banner';
import avatarConfigurations from './avatar-configurations';
import './stylesheet.css';

class GameMasterStart extends Component {
  startGame = () => {
    const { startGame, gameId, clientRole } = this.props;
    startGame(gameId, clientRole);
  };

  generateGameUrl() {
    const { gameId } = this.props;
    return `${window.location.href}?gameId=${gameId}`;
  }

  renderFailureMessage() {
    const { failureCode } = this.props;
    if (!failureCode) return null;

    return (
      <div className="game-master-start__failure">
        Failed to start game: {getFailureMessage(failureCode)}
      </div>
    );
  }

  renderMessage() {
    const {
      gameSettings: { numberOfPlayers },
      players,
    } = this.props;
    const playersToConnect = numberOfPlayers - players.length;
    if (playersToConnect > 0) {
      return `Waiting for ${playersToConnect} players to join`;
    }

    return (
      <button type="button" onClick={this.startGame}>
        Start Game!
      </button>
    );
  }

  renderPlaceholders() {
    const {
      gameSettings: { numberOfPlayers },
      players,
    } = this.props;

    return _.map(_.range(numberOfPlayers), index => {
      const player = players[index];

      if (!_.isObject(player)) {
        return (
          <div className="game-master-start__players__placeholder" key={index}>
            {index + 1}
          </div>
        );
      }

      const {
        player: { name },
      } = player;
      const { mood, color } = avatarConfigurations[index];

      return (
        <div className="game-master-start__players__player" key={name}>
          <div className="game-master-start__players__player__avatar">
            <Planet mood={mood} color={color} size={110} />
          </div>
          <div className="game-master-start__players__player__name">{name}</div>
        </div>
      );
    });
  }

  render() {
    const { gameId, clientRole } = this.props;
    return (
      <div>
        <RoleBanner gameId={gameId} role={clientRole} />

        <div className="game-master-start">
          {this.renderFailureMessage()}
          <div className="game-master-start__waiting-message">
            {this.renderMessage()}
          </div>
          <div className="game-master-start__players">
            {this.renderPlaceholders()}
          </div>
          <div className="game-master-start__qr-code">
            <QRCode size={250} value={this.generateGameUrl()} />
          </div>
        </div>
      </div>
    );
  }
}

GameMasterStart.propTypes = {
  startGame: PropTypes.func.isRequired,
  gameId: PropTypes.string.isRequired,
  clientRole: PropTypes.oneOf(Object.keys(roles)).isRequired,
  failureCode: PropTypes.oneOf(Object.keys(serverErrors)),
  gameSettings: PropTypes.shape({
    numberOfPlayers: PropTypes.number.isRequired,
  }).isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      player: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  ),
};

GameMasterStart.defaultProps = {
  players: [],
  failureCode: null,
};

export default GameMasterStart;
