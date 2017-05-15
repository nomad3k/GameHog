import update from 'react-addons-update';

import * as Types from './types';

const initialState = {
  name: 'Gamehog',
  loading: 0,
  identity: {
  },
  players: {
  },
  documents: {
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

    case Types.USER_LOGIN:
      return update(state, {
        identity: { $set: action.user }
      });

    case Types.SOCKET_CONNECT:
      return update(state, {
        socket: { $set: action.socket }
      });

    case Types.PLAYER_JOINED:
      return update(state, {
        players: {
          [action.username]: {
            $set: {
              username: action.username,
              playerName: action.playerName,
              characterName: action.characterName
            }
          }
        }
      });

    case Types.PLAYER_QUIT:
      return update(state, {
        players: {
          [action.username]: { $set: undefined }
        }
      });

    case Types.PLAYER_CONNECTED:
      return update(state, {
        players: {
          [action.username]: {
            connected: { $set: true }
          }
        }
      });

    case Types.PLAYER_DISCONNECTED:
      return update(state, {
        players: {
          [action.username]: {
            connected: { $set: false }
          }
        }
      });

    case Types.CHAT_MESSAGE: {
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
