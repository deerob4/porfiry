import { createStore, applyMiddleware } from 'redux';
import rootReducer from 'reducers/index';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({
  predicate: (getState, action ) => (
    action.type !== 'SAVING_IN_PROGRESS'
  ),
  collapsed: (getState, action ) => (
    action.type === 'SAVING_SUCCEEDED'
  )
});

function configureStore(browserHistory) {
  return createStore(
    rootReducer,
    applyMiddleware(thunk, logger),
  );
}

export default configureStore;
