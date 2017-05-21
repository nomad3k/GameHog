import * as Types from './types';
import IO from 'socket.io';

const socket = new IO();
let attached = false;

function attach(dispatch) {
  if (attached) return;
  attached = true;
  socket.on('event', data => {
    // eslint-disable-next-line no-console
    console.log('event', data);
    dispatch(data);
  });
  socket.on('events', data => {
    // eslint-disable-next-line no-console
    console.log('events', data);
    for(let i=0,ii=data.length;i<ii;i++)
      dispatch(data[i]);
  });
  socket.on('players', data => {
    console.log('players', data);
    dispatch({
      type: Types.PLAYER_SET,
      data
    });
  });
  socket.on('documents', data => {
    console.log('documents', data);
    dispatch({
      type: Types.DOCUMENT_SET,
      data
    })
  });
}

export function loadingStart() {
  return { type: Types.LOADING_START };
}

export function loadingStop() {
  return { type: Types.LOADING_STOP };
}

export function socketConnect() {
  return dispatch => {
    attach(dispatch);
    dispatch({
      type: Types.SOCKET_CONNECT,
      socket: socket
    });
  };
}

export function login({ username, password }, callback) {
  return dispatch => {
    socket.emit('login', {
      username,
      password
    }, response => {
      if (response.ok) {
        dispatch({
          type: Types.USER_LOGIN,
          user: response.user
        });
      }
      callback(response);
    });
  };
}

export function logout() {
  return dispatch => {
    socket.emit('logout', response => {
      if (response.ok) {
        dispatch({
          type: Types.USER_LOGOUT
        });
      }
    })
  };
}

export function register({ username, password, confirmPassword, playerName, characterName }, callback) {
  return dispatch => {
    socket.emit('register', {
      username,
      password,
      confirmPassword,
      playerName,
      characterName
    }, response => {
      dispatch({
        type: Types.USER_LOGIN,
        user: response.user
      });
      callback(response);
    });
  };
}

export function send(action) {
  return _dispatch => {
    socket.emit('event', action);
  };
}

export function chatMessage(id, message) {
  return {
    type: Types.CHAT_MESSAGE,
    id: id,
    message: message
  };
}

export function playerJoined({ username, playerName, characterName }) {
  return {
    type: Types.PLAYER_JOINED,
    username,
    playerName,
    characterName
  };
}

export function playerQuit(username) {
  return {
    type: Types.PLAYER_QUIT,
    username
  }
}

export function playerConnected(username) {
  return {
    type: Types.PLAYER_CONNECTED,
    username
  };
}

export function playerDisconnected(username) {
  return {
    type: Types.PLAYER_DISCONNECTED,
    username
  }
}
