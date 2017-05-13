import * as Types from './types';

export function loadingStart() {
  return { type: Types.LOADING_START };
}

export function loadingStop() {
  return { type: Types.LOADING_STOP };
}

export function socketConnect() {
  return {
    type: Types.SOCKET_CONNECT
  };
}

export function socketOn(event, handler) {
  return {
    type: Types.SOCKET_ON,
    event,
    handler
  };
}

export function socketEmit(event, data, callback) {
  return {
    type: Types.SOCKET_EMIT,
    event,
    data,
    callback
  };
}

export function chatSend(id, message) {
  return dispatch => {
    dispatch({
      type: Types.SOCKET_EMIT,
      event: 'chat',
      data: { id, message },
      callback: (data) => {
        dispatch({
          type: Types.CHAT_SEND,
          id: data.id,
          message: data.message
        });
      }
    });
  };
}
