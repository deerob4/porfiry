// import { createStore, applyMiddleware } from 'redux';
// import rootReducer from 'reducers/index';
// import createLogger from 'redux-logger';
// import thunk from 'redux-thunk';

// const logger = createLogger({
//   predicate: (getState, action ) => (
//     action.type !== 'SAVING_IN_PROGRESS'
//     && action.type !== 'UPDATE_COUNTDOWN'
//   ),
//   collapsed: true
// });

// function configureStore(browserHistory) {
//   return createStore(
//     rootReducer,
//     applyMiddleware(thunk, logger)
//   );
// }

// export default configureStore;

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

const logger = createLogger({
  predicate: (getState, action ) => (
    action.type !== 'SAVING_IN_PROGRESS'
    && action.type !== 'UPDATE_COUNTDOWN'
  ),
  collapsed: true
});

function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    applyMiddleware(thunk, logger)
  );

  if (module.hot) {
    let nextReducer = require('../reducers').default;

    module.hot.accept('../reducers', () => {
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

export default configureStore;
