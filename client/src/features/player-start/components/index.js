import React, { Component } from 'react';
import _ from 'lodash';
import { KawaiiPlanet } from 'react-kawaii';
import RoleBanner from 'components/role-banner';
import avatarConfigurations from '../../game-master-start/components/avatar-configurations';
import './stylesheet.css';

class PlayerStart extends Component {
  static defaultProps = {
    players: []
  };

  renderMessage() {
    const { gameSettings: { numberOfPlayers }, players } = this.props;
    const playersToConnect = numberOfPlayers - players.length
    if (playersToConnect > 0) {
      return `Waiting for ${playersToConnect} more players to join`;
    }
  }

  renderPlayerDetails() {
    const { playerName, players } = this.props;
    const index = _.findIndex(players, ({ player }) => player.name === playerName);
    return (
      <div className='player-start__player'>
        <div className='player-start__player__avatar'>
          <KawaiiPlanet {...avatarConfigurations[index]} size={110} />
        </div>
        <div className='player-start__player__name'>
          {playerName}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <RoleBanner
          gameId={this.props.gameId}
          role={this.props.clientRole}
        />

        <div className='player-start'>
          <div className='player-start__waiting-message'>
            {this.renderMessage()}
          </div>
          {this.renderPlayerDetails()}
        </div>
      </div>
    );
  }
}

export default PlayerStart;
