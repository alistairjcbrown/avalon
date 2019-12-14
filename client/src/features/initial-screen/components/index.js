import React from 'react';
import PropTypes from 'prop-types';
import constants from 'shared-constants';
import getFailureMessage from 'features/shared/get-failure-message';
import StartMenu from './start-menu';
import './stylesheet.css';

function renderFailureMessage(failureCode) {
  if (!failureCode) return null;

  return (
    <div className="initial-screen__failure">
      Failed to connect to game: {getFailureMessage(failureCode)}
    </div>
  );
}

const InitialScreen = ({
  failureCode,
  onCreateNewGame,
  onJoinExistingGame,
}) => (
  <div className="initial-screen">
    {renderFailureMessage(failureCode)}
    <StartMenu
      onCreateNewGame={onCreateNewGame}
      onJoinExistingGame={onJoinExistingGame}
    />
  </div>
);

InitialScreen.propTypes = {
  failureCode: PropTypes.oneOf(Object.values(constants.serverErrors)),
  onCreateNewGame: PropTypes.func.isRequired,
  onJoinExistingGame: PropTypes.func.isRequired,
};

InitialScreen.defaultProps = {
  failureCode: null,
};

export default InitialScreen;
