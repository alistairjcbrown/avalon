import React, { Component } from 'react';
import RoleBanner from 'components/role-banner';

class PlayerStart extends Component {
  render() {
    return (
      <div>
        <RoleBanner role={this.props.clientRole} gameId={this.props.gameId} />
        <p>Player start</p>
      </div>
    );
  }
}

export default PlayerStart;
