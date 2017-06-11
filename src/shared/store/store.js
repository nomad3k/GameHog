import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import reducer from './reducer';

export default function configureStore(initialState) {
  const store = createStore(
    reducer,
    applyMiddleware(
      thunkMiddleware
    ),
    initialState
  );

  return store;
}
