import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import Settings from './settings.js';

const init = () => {
  ReactDOM.render(
      <App
        gameTime={Settings.GAME_TIME}
        errorCount={Settings.ERROR_COUNT}
      />,
      document.querySelector(`.main`)
  );
};

init();
