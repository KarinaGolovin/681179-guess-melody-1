import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {rootReducer} from './store/reducers/index.js.js';
import App from './components/app/app.jsx';
import Settings from './mocks/settings.js';
import Questions from './mocks/questions.js';


const init = () => {
  ReactDOM.render(
      <Provider store={createStore(rootReducer)}>
        <App
          gameTime={Settings.GAME_TIME}
          errorCount={Settings.ERROR_COUNT}
          questions={Questions}
        />
      </Provider>,
      document.querySelector(`.main`)
  );
};

init();
