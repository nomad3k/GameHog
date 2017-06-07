import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import server from './reducer';
import shared from '../../shared/store/reducer';

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({ server, shared }),
    initialState,
    applyMiddleware(
      thunkMiddleware,
    )
  );

  return store;
}
