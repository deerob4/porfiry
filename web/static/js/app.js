import ReactDOM from 'react-dom';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { browserHistory } from 'react-router';
import configureStore from './store';
import Root from 'containers/Root';

import 'styles/animate.min.css';
import 'styles/button.css';
import 'styles/select.css';
import 'styles/headings.css';
import 'styles/answer.css';
import 'styles/input.css';
import 'styles/load-quiz.css';
import 'styles/schedule-quiz.css';
import 'styles/countdown.css';
import 'styles/question-timer.css';
import 'styles/lobby.css';

const store = configureStore(browserHistory);
const target = document.getElementById('root');

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  target
);

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextApp = require('./containers/Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp store={store} />
      </AppContainer>,
     target
    );
  });
}
