import React from 'react';
import PropTypes from 'prop-types';
import StartMenu from 'components/start-menu';
import './stylesheet.css';

function renderFailureMessage(failureMessage) {
  if (!failureMessage) return null;

  return (
    <div className="initial-screen__failure">
      Failed to connect to game, {failureMessage.toLowerCase()}
    </div>
  );
}

const InitialScreen = ({
  failureMessage,
  onCreateNewGame,
  onJoinExistingGame,
}) => (
  <div className="initial-screen">
    {renderFailureMessage(failureMessage)}
    <StartMenu
      onCreateNewGame={onCreateNewGame}
      onJoinExistingGame={onJoinExistingGame}
    />
  </div>
);

InitialScreen.propTypes = {
  failureMessage: PropTypes.string,
  onCreateNewGame: PropTypes.func.isRequired,
  onJoinExistingGame: PropTypes.func.isRequired,
};

InitialScreen.defaultProps = {
  failureMessage: null,
};

export default InitialScreen;
