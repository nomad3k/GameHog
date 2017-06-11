import io from 'socket.io';

import * as Types from './types';
import * as Events from '../../shared/events';

let socket = null;

function connect(callback) {
  socket = new io();
  socket.on('connect', function() {
    callback(socket);
  });
}

export function connectSocket() {
  return dispatch => {
    dispatch({
      type: Types.SOCKET_CONNECT
    });
    connect(function(socket) {
      dispatch({
        type: Types.SOCKET_CONNECT_SUCCESS,
        socket
      });
    })
  };
}

export function login({ userName, password }) {
  if (!userName) throw new Error('Missing parameter: userName');
  if (!password) throw new Error('Missing parameter: password');
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject({ ok: false, message: 'Socket not initialised' });
      socket.emit(Events.AUTH_LOGIN, { userName, password }, response => {
        if (response && response.ok) {
          dispatch({
            type: Types.LOGIN,
            user: response.data
          });
          resolve(response);
        } else {
          reject(response.errors);
        }
      });
    });
  }
}

export function register({ userName, password, confirmPassword, playerName, characterName }) {
  if (!userName) throw new Error('Missing parameter: userName');
  if (!password) throw new Error('Missing parameter: password');
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject({ ok: false, message: 'Socket not initialised' });
      socket.emit(Events.AUTH_REGISTER, {
        userName, password, confirmPassword, playerName, characterName
      }, response => {
        if (response && response.ok) {
          resolve(response);
        } else {
          reject(response.errors);
        }
      });
    });
  }
}



export function socketConnected() {
}
