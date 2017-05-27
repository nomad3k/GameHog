import * as Types from './types';

class ArgumentRequiredError extends Error {
  constructor(message) {
    super(`Argument Requred: ${message}`);
  }
}

export function clientConnected(client) {
  if (!client) throw new ArgumentRequiredError('client');
  return {
    type: Types.CLIENT_CONNECTED,
    id: client.id
  };
}

export function clientDisconnected(client) {
  if (!client) throw new ArgumentRequiredError('client');
  return {
    type: Types.CLIENT_DISCONNECTED,
    id: client.id
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

export function playerRegistered({ userName, playerName, characterName }) {
  if (!userName) throw new ArgumentRequiredError('userName');
  if (!playerName) throw new ArgumentRequiredError('playerName');
  if (!characterName) throw new ArgumentRequiredError('characterName');
  return {
    type: Types.PLAYER_REGISTERED,
    userName, playerName, characterName
  };
}
