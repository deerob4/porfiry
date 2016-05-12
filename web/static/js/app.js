import ReactDOM from 'react-dom';
import React from 'react';
import { browserHistory } from 'react-router';
import configureStore from './store';
import Root from 'containers/root';

import 'styles/button.css';
import 'styles/select.css';
import 'styles/headings.css';
import 'styles/answer.css';
import 'styles/input.css';
import 'styles/load-quiz.css';
import 'styles/schedule-quiz.css';

const store = configureStore(browserHistory);
const target = document.getElementById('root');
const node = <Root routerHistory={browserHistory} store={store} />;

ReactDOM.render(node, target);
