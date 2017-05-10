import update from 'react-addons-update';

import * as Types from './types';

const initialState = {
  name: 'Gamehog',
  loading: 0,
  players: {
    'chris': {
      name: 'Chris Kemp',
      connected: true
    },
    'john': {
      name: 'John Smith',
      connected: true
    },
    'dave': {
      name: 'Dave Jones',
      connected: true
    },
    'tracy': {
      name: 'Tracy Davis',
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
        y: 0,
        width: 320,
        height: 320
      },
      data: {
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
        y: 0,
        width: 320,
        height: 320
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

    default:
      return state;
  }
}
