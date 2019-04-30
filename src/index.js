import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import settings from './settings.js';

const init = () => {
  ReactDOM.render(
      <App
        gameTime={settings.gameTime}
        errorCount={settings.errorCount}
      />,
      document.querySelector(`.main`)
  );
};

init();
