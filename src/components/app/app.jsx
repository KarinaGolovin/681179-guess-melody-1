import React from 'react';
import PropTypes from 'prop-types';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';

const App = (props) => {
  const {gameTime, errorCount, onClick} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
    onClick={onClick}
  />;
};

App.propTypes = {
  gameTime: PropTypes.number,
  errorCount: PropTypes.number,
  onClick: PropTypes.func,
  questions: PropTypes.array.isRequired,
};

export default App;
