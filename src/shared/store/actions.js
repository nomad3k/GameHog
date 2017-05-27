import * as Types from './types';

function ArgumentRequiredError(title) {
  this.title = title;
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
