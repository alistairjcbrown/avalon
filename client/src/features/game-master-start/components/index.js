import React, { Component } from 'react';
import RoleBanner from 'components/role-banner';

class GameMasterStart extends Component {
  render() {
    return (
      <div>
        <RoleBanner role={this.props.clientRole} gameId={this.props.gameId} />
        <p>Game master start</p>
      </div>
    );
  }
}

export default GameMasterStart;
