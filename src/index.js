import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './store/reducers';
import App from './components/app/app.jsx';
import Settings from './mocks/settings.js';
import Questions from './mocks/questions.js';


const init = () => {
  ReactDOM.render(
      <Provider store={createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
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
