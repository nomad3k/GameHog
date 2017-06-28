import * as Types from './types';

class ArgumentRequiredError extends Error {
  constructor(message) {
    super(`Argument Requred: ${message}`);
  }
}

export function stateResync({ state }) {
  if (!state) throw new ArgumentRequiredError('state');
  return {
    type: Types.STATE_RESYNC,
    state
  };
}

export function clientConnected({ id }) {
  if (!id) throw new ArgumentRequiredError('id');
  return {
    type: Types.CLIENT_CONNECTED,
    id
  };
}

export function clientDisconnected({ id }) {
  if (!id) throw new ArgumentRequiredError('id');
  return {
    type: Types.CLIENT_DISCONNECTED,
    id
  };
}

export function userRegistered({ userName, password }) {
  if (!userName) throw new ArgumentRequiredError('userName');
  if (!password) throw new ArgumentRequiredError('password');
  return {
    type: Types.USER_REGISTERED,
    userName, password
  };
}

export function userUnregistered({ userName }) {
  if (!userName) throw new ArgumentRequiredError('userName');
  return {
    type: Types.USER_UNREGISTERED,
    userName
  };
}

export function playerRegistered({ userName, playerName, characterName }) {
  if (!userName) throw new ArgumentRequiredError('userName');
  if (!playerName) throw new ArgumentRequiredError('playerName');
  if (!characterName) throw new ArgumentRequiredError('characterName');
  return {
    type: Types.PLAYER_REGISTERED,
    userName, playerName, characterName
  };
}

export function playerUnregistered({ userName }) {
  if (!userName) throw new ArgumentRequiredError('userName');
  return {
    type: Types.PLAYER_UNREGISTERED,
    userName
  };
}

export function playerConnected({ userName }) {
  if (!userName) throw new ArgumentRequiredError('userName');
  return {
    type: Types.PLAYER_CONNECTED,
    userName
  }
}

export function playerDisconnected({ userName }) {
  if (!userName) throw new ArgumentRequiredError('userName');
  return {
    type: Types.PLAYER_DISCONNECTED,
    userName
  }
}

export function stateReset() {
  return {
    type: Types.STATE_RESET
  };
}
