import update from 'react-addons-update';

import * as Types from './types';

const initialState = {
  name: 'Gamehog',
  loading: 0
};

function start(state) {
  return state.loading + 1;
}

function stop(state) {
  return state.loading > 0 ? state.loading - 1 : 0;
}

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case Types.LOADING_START:
      return update(state, {
        loading: { $set: start(state) }
      });

    case Types.LOADING_STOP:
      return update(state, {
        loading: { $set: stop(state) }
      });

    default:
      return state;
  }
}
