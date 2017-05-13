import * as Types from './types';

export function loadingStart() {
  return { type: Types.LOADING_START };
}

export function loadingStop() {
  return { type: Types.LOADING_STOP };
}

export function chatSend(id, message) {
  return {
    type: Types.CHAT_SEND,
    id, message
  };
}
