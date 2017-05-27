import { Map } from 'immutable';

import * as Types from './types';
import * as State from './state';

export default function reducer(state = State.initialState, action) {
  console.log(action);
  switch (action.type) {

    case Types.CLIENT_CONNECTED:
      return state.setIn([State.PLAYERS, action.id], Map({ }));

    case Types.CLIENT_DISCONNECTED:
      return state.deleteIn([State.PLAYERS, action.id]);

    default:
      return state;
  }
}
