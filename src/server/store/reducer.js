import { fromJS } from 'immutable';
import { Map } from 'immutable';

import * as Types from './types';

const USERS = 'users';

const initialState = fromJS({
  [USERS]: { }
});

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case Types.USER_REGISTERED: {
      const { userName, password } = action;
      return state.setIn(
        [USERS, userName],
        Map({ password })
      );
    }

    case Types.USER_UNREGISTERED: {
      const { userName } = action;
      return state.deleteIn(
        [USERS, userName],
      );
    }

    default:
      return state;
  }
}
