import { Map, List, fromJS } from 'immutable';

import * as Types from './types';

const initialState = fromJS({
  clients: { },
  topics: { }
});

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case Types.CLIENT_CONNECTED: {
      return state.setIn(
        ['clients', action.client ],
        Map({
          socket: action.socket,
          subscriptions: List([ ])
        })
      );
    }

    case Types.CLIENT_DISCONNECTED:
      state.getIn(['clients', action.client, 'subscriptions']).forEach(topic => {
        state = state.updateIn(
          ['topics', topic, 'subscribers'],
          s => s.filter(c => c !== action.client)
        );
      })
      return state.deleteIn(['clients', action.client]);

    case Types.TOPIC_OPEN:
      return state.setIn(
        ['topics', action.topic],
        fromJS({ subscribers: [] })
      );

    case Types.TOPIC_CLOSE:
      state.getIn(['topics', action.topic, 'subscribers']).forEach(client => {
        state = state.updateIn(
          ['clients', client, 'subscriptions'],
          s => s.filter(t => t !== action.topic)
        );
      });
      return state.deleteIn(['topics', action.topic]);

    case Types.TOPIC_SUBSCRIBE:
      return state
        .updateIn(
          ['clients', action.client, 'subscriptions'],
          s => s.push(action.topic)
        )
        .updateIn(
          ['topics', action.topic, 'subscribers'],
          s => s.push(action.client)
        );

    case Types.TOPIC_UNSUBSCRIBE:
    default:
      return state;
  }
}
