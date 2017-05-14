import * as Types from './types';
import IO from 'socket.io';

const socket = new IO();

function attach(dispatch) {
  socket.on('event', data => {
    console.log('event', data);
    dispatch(data);
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
