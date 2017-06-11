import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

import client from './reducer';
import shared from '../../shared/store/reducer';

const loggerMiddleware = createLogger();

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({ client, shared }),
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    ),
    initialState
  );

  return store;
}
