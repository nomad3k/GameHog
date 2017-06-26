import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';

import client from './reducer';
import shared from '../../shared/store/reducer';

function logger({ getState, dispatch }) {
  return next => action => {
    const { type, ...other } = action;
    console.log('\x1B\[33m%s\x1B\[0m =>', type, other );
    const returnValue = next(action);
    return returnValue;
  };
}

export default function configureStore(initialState) {
  const store = createStore(
    combineReducers({ client, shared }),
    applyMiddleware(
      thunkMiddleware,
      logger
    ),
    initialState
  );

  return store;
}
