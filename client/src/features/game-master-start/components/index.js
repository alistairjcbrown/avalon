import React, { Component } from 'react';
import { KawaiiPlanet } from 'react-kawaii';
import _ from 'lodash';
import RoleBanner from 'components/role-banner';
import avatarConfigurations from './avatar-configurations';
import './stylesheet.css';

class GameMasterStart extends Component {
  static defaultProps = {
    players: []
  };

  renderMessage() {
    const { gameSettings: { numberOfPlayers }, players } = this.props;
    const playersToConnect = numberOfPlayers - players.length
    if (playersToConnect > 0) {
      return `Waiting for ${playersToConnect} players to join`;
    }
    return (
      <button>Start Game!</button>
    );
  }

  renderPlaceholders() {
    const { gameSettings: { numberOfPlayers }, players } = this.props;
    return _.map(_.range(numberOfPlayers), function (index) {
      const player = players[index];
      if (_.isObject(player)) {
        const { player: { name } } = player;
        return (
          <div className='game-master-start__players__player' key={name}>
            <div className='game-master-start__players__player__avatar'>
              <KawaiiPlanet {...avatarConfigurations[index]} size={110} />
            </div>
            <div className='game-master-start__players__player__name'>
              {name}
            </div>
          </div>
        );
      }
      return (
        <div className='game-master-start__players__placeholder' key={index}>
          {index + 1}
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <RoleBanner
          gameId={this.props.gameId}
          role={this.props.clientRole}
        />

        <div className='game-master-start'>
          <div className='game-master-start__waiting-message'>
            {this.renderMessage()}
          </div>
          <div className='game-master-start__players'>
            {this.renderPlaceholders()}
          </div>
        </div>
      </div>
    );
  }
}

export default GameMasterStart;
