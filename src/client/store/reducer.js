import update from 'react-addons-update';
import IO from 'socket.io';

import * as Types from './types';

const initialState = {
  name: 'Gamehog',
  loading: 0,
  identity: {
    id: 'chris'
  },
  players: {
    'chris': {
      name: 'Chris',
      connected: true
    },
    'john': {
      name: 'John',
      connected: true
    },
    'dave': {
      name: 'Dave',
      connected: true
    },
    'tracy': {
      name: 'Tracy',
      connected: false
    }
  },
  documents: {
    'd6de4357-5332-4dc7-8bc1-65e8f2072a0c': {
      type: 'chat',
      title: 'Foo',
      players: ['chris', 'john'],
      window: {
        x: 20,
        y: 20,
        width: 320,
        height: 300
      },
      data: {
        nextId: 13,
        lines: [
          { id: 1, text: 'Hello @john', who: 'chris', when: new Date() },
          { id: 2, text: 'Hello @chris', who: 'john', when: new Date() },
          { id: 3, text: 'Something something', who: 'john', when: new Date() },
          { id: 4, text: 'Rhubarb rhubarb', who: 'john', when: new Date() },
          { id: 5, text: 'Hello @john', who: 'chris', when: new Date() },
          { id: 6, text: 'Hello @chris', who: 'john', when: new Date() },
          { id: 7, text: 'Something something', who: 'john', when: new Date() },
          { id: 8, text: 'Rhubarb rhubarb', who: 'john', when: new Date() },
          { id: 9, text: 'Rhubarb rhubarb', who: 'john', when: new Date() },
          { id: 10, text: 'Rhubarb rhubarb', who: 'john', when: new Date() },
          { id: 11, text: 'Rhubarb rhubarb', who: 'john', when: new Date() },
          { id: 12, text: 'Rhubarb rhubarb', who: 'john', when: new Date() }
        ]
      }
    },
    'efe52961-eec2-4daf-9d70-97b310bf6613': {
      type: 'map',
      title: 'A Map',
      players: ['chris', 'john', 'dave', 'tracy'],
      window: {
        x: 360,
        y: 20,
        width: 320,
        height: 300
      },
      data: {
      }
    }
  }
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

    case Types.SOCKET_CONNECT:
      return update(state, {
        socket: { $set: new IO() }
      });

    case Types.SOCKET_ON:
      state.socket.on(action.event, action.handler);
      return state;

    case Types.SOCKET_EMIT:
      debugger;
      state.socket.emit(action.event, action.data, action.callback);
      return state;

    case Types.CHAT_SEND: {
      var message = action.message.trim();
      let cmd = {
        documents: { }
      };
      var data = state.documents[action.id].data;
      cmd.documents[action.id] = {
        data: {
          nextId: { $set: data.nextId + 1 },
          lines: {
            $push: [{
              id: data.nextId,
              who: state.identity.id,
              when: new Date(),
              text: message
            }]
          }
        }
      }
      return update(state, cmd);
    }

    default:
      return state;
  }
}
