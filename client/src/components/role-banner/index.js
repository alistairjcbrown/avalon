import React from 'react';
import PropTypes from 'prop-types';
import { SPECTATOR, PLAYER, GAME_MASTER } from 'roles';
import './stylesheet.css';

function renderRole(role) {
  switch (role) {
    case GAME_MASTER:
      return 'You are the game master of this game';

    case PLAYER:
      return 'You are a player in this game';

    case SPECTATOR:
      return 'You are a spectator';

    default:
      return 'Unknown role';
  }
}

const RoleBanner = ({ role, gameId }) => (
  <div className="role-banner">
    <span className="role-banner__role">{renderRole(role)}</span>
    <span className="role-banner__game">[Game Id: {gameId}]</span>
  </div>
);

RoleBanner.propTypes = {
  role: PropTypes.oneOf([SPECTATOR, PLAYER, GAME_MASTER]).isRequired,
  gameId: PropTypes.string.isRequired,
};

export default RoleBanner;
