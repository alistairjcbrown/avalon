import React, { Component } from 'react';
import RoleBanner from 'components/role-banner';

class PlayerStart extends Component {
  render() {
    return (
      <div>
        <RoleBanner
          gameId={this.props.gameId}
          role={this.props.clientRole}
          playerName={this.props.playerName}
        />
        <p>Player start</p>
      </div>
    );
  }
}

export default PlayerStart;
