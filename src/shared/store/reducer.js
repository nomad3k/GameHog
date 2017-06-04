import { Map } from 'immutable';

import * as Types from './types';
import * as State from './state';

export default function reducer(state = State.initialState, action) {
  switch (action.type) {

    case Types.CLIENT_CONNECTED:
      return state.setIn(
        [State.CLIENTS, action.id],
        Map({ })
      );

    case Types.CLIENT_DISCONNECTED:
      return state.deleteIn([State.CLIENTS, action.id]);

    case Types.USER_REGISTERED: {
      const { userName, password } = action;
      return state.setIn(
        [State.USERS, userName],
        Map({ password })
      );
    }

    case Types.PLAYER_REGISTERED: {
      const { userName, playerName, characterName } = action;
      return state.setIn(
        [State.PLAYERS, userName ],
        Map({ playerName, characterName, connected: false })
      );
    }

    case Types.PLAYER_CONNECTED: {
      const { userName } = action;
      return state.setIn(
        [State.PLAYERS, userName, 'connected'],
        true
      );
    }

    case Types.PLAYER_DISCONNECTED: {
      const { userName } = action;
      return state.setIn(
        [State.PLAYERS, userName, 'connected'],
        false
      );
    }

    default:
      return state;
  }
}