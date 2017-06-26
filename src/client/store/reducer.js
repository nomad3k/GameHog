import update from 'react-addons-update';

import * as Types from './types';

const initialState = {
  socket: null,
  identity: null,
  messages: [ ]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case Types.STATE_RESET:
      return initialState;

    // do nothing
    case Types.SOCKET_CONNECT:
      return state;

    case Types.SYSTEM_MESSAGE:
      return update(state, {
        messages: { $unshift: [action.message] }
      });

    case Types.SOCKET_CONNECT_SUCCESS: {
      return update(state, {
        socket: { $set: action.socket }
      });
    }

    case Types.LOGIN: {
      return update(state, {
        identity: { $set: action.user }
      });
    }

    case Types.LOGOUT: {
      return update(state, {
        identity: { $set: null }
      });
    }

    default:
      return state;

  }
}
