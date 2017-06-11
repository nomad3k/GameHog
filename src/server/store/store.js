import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import server from './reducer';
import shared from '../../shared/store/reducer';

const loggerMiddleware = createLogger({
  level: 'error',
  timestamp: false,
  colors: false,
  stateTransformer: s => s.toJS ? s.toJS() : s
});

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({ server, shared }),
    initialState,
    applyMiddleware(
      thunkMiddleware,
      // loggerMiddleware
    )
  );

  return store;
}
