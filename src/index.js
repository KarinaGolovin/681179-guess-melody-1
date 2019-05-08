import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import Settings from './mocks/settings.js';
import Questions from './mocks/questions.js';


const init = () => {
  ReactDOM.render(
      <App
        gameTime={Settings.GAME_TIME}
        errorCount={Settings.ERROR_COUNT}
        onClick={() => {}}
      />,
      document.querySelector(`.main`)
  );
};

init();
