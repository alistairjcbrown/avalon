import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Planet } from 'react-kawaii';
import RoleBanner from 'components/role-banner';
import avatarConfigurations from '../../game-master-start/components/avatar-configurations';
import './stylesheet.css';

class PlayerStart extends Component {
  renderMessage() {
    const {
      gameSettings: { numberOfPlayers },
      players,
    } = this.props;

    const playersToConnect = numberOfPlayers - players.length;
    if (playersToConnect > 0) {
      return `Waiting for ${playersToConnect} more players to join`;
    }

    return null;
  }

  renderPlayerDetails() {
    const { playerName, players } = this.props;
    const index = _.findIndex(
      players,
      ({ player }) => player.name === playerName,
    );
    const { mood, color } = avatarConfigurations[index];

    return (
      <div className="player-start__player">
        <div className="player-start__player__avatar">
          <Planet mood={mood} color={color} size={110} />
        </div>
        <div className="player-start__player__name">{playerName}</div>
      </div>
    );
  }

  render() {
    const { gameId, clientRole } = this.props;
    return (
      <div>
        <RoleBanner gameId={gameId} role={clientRole} />
        <div className="player-start">
          <div className="player-start__waiting-message">
            {this.renderMessage()}
          </div>
          {this.renderPlayerDetails()}
        </div>
      </div>
    );
  }
}

PlayerStart.defaultProps = {
  players: [],
};

PlayerStart.propTypes = {
  gameId: PropTypes.string.isRequired,
  clientRole: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(
    PropTypes.shape({
      player: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  ),
  gameSettings: PropTypes.shape({
    numberOfPlayers: PropTypes.number.isRequired,
  }).isRequired,
};

export default PlayerStart;
