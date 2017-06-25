import io from 'socket.io';

import * as SharedActions from '../../shared/store/actions';
import * as Types from './types';
import * as Events from '../../shared/events';

let socket = null;

function connect(dispatch, callback) {
  socket = new io();

  socket.on('connect', function() {
    console.log('socket.connect');
    callback(socket);
  });

  socket.on(Events.SYSTEM, arg => {
    console.log('SYSTEM', arg);
  });

  socket.on(Events.EVENT, event => {
    console.log('EVENT', event);
    dispatch(event);
  });

}

export function connectSocket() {
  return dispatch => {
    dispatch({
      type: Types.SOCKET_CONNECT
    });
    connect(dispatch, function(socket) {
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
        console.log('AUTH_LOGIN', response);
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

export function logout() {
  return dispatch => new Promise((resolve, reject) => {
    if (!socket) return reject({ ok: false, message: 'Socket not initialised' });
    socket.emit(Events.AUTH_LOGOUT, { }, response => {
      if (response && response.ok) {
        dispatch({
          type: Types.LOGOUT
        });
        resolve(response);
      } else {
        reject(response.errors);
      }
    });
  });
}

export function register({ userName, password, confirmPassword, playerName, characterName }) {
  if (!userName) throw new Error('Missing parameter: userName');
  if (!password) throw new Error('Missing parameter: password');
  return _dispatch => {
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

export function unregister() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject({ ok: false, message: 'Socket not initialised' });
      socket.emit(Events.AUTH_UNREGISTER, { }, response => {
        if (response && response.ok) {
          dispatch({ type: Types.LOGOUT });
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

export function stateResync() {
  return dispatch => {
    return new Promise((resolve, reject) => {
      if (!socket) return reject({ ok: false, message: 'Socket not initialised' });
      socket.emit(Events.STATE_RESYNC, { }, response => {
        if (response && response.ok) {
          dispatch(SharedActions.stateResync(response.data));
          resolve(response);
        } else {
          reject(response.error);
        }
      });
    });
  };
}
