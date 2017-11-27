import React, { Component } from 'react';
import RoleBanner from 'components/role-banner';

class GameMasterStart extends Component {
  render() {
    const { numberOfPlayers } = this.props.gameSettings;
    const players = this.props.players || [];
    console.log(players);

    return (
      <div>
        <RoleBanner
          gameId={this.props.gameId}
          role={this.props.clientRole}
        />
        <p>Game master start</p>

        <p>Waiting for {numberOfPlayers - players.length} players to join</p>
      </div>
    );
  }
}

export default GameMasterStart;
