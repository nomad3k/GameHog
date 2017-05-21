import validate from 'validation-unchained';

import * as Actions from './store/actions';
import * as Events from '../shared/events';
import { ok, badRequest, invalidRequest } from './responses';

export function connect(store) {
  return function(client) {
    // -------------------------------------------------------------------------
    // CONNECT
    // -------------------------------------------------------------------------

    client.emit(Events.SYSTEM, `connected: ${client.id}`);
    store.dispatch(Actions.clientConnected({ client: client.id }));

    // -------------------------------------------------------------------------
    // DISCONNECT
    // -------------------------------------------------------------------------

    client.on(Events.DISCONNECT, function() {
      client.emit('SYSTEM', `disconnected: ${client.id}`);
      store.dispatch(Actions.clientDisconnected({ client: client.id }));
    });

    // -------------------------------------------------------------------------
    // SUBSCRIBE
    // -------------------------------------------------------------------------

    client.on(Events.SUBSCRIBE, function(data, callback) {
      const { errors, model } = validate(data, {
        strict: true,
        rules: {
          id: { type: String, required: true }
        }
      });
      if (errors) return callback(badRequest(errors));
      const topic = store.getState().topics[model.id];
      if (!topic) return callback(invalidRequest({ id: ['Unknown Topic Id'] }));

      store.dispatch(Actions.subscribeTopic({
        client: client.id,
        topic: model.id
      }));

      callback(ok());
    });

    // -------------------------------------------------------------------------
    // UNSUBSCRIBE
    // -------------------------------------------------------------------------

    client.on(Events.UNSUBSCRIBE, function(data, callback) {
      const { errors, model } = validate(data, {
        strict: true,
        rules: {
          id: { type: String, required: true }
        }
      });
      if (errors) return callback(badRequest(errors));
      const topic = store.getState().topics[model.id];
      if (!topic) return callback(invalidRequest({ id: ['Unknown Topic Id'] }));

      store.dispatch(Actions.unsubscribeTopic({
        client: client.id,
        topic: model.id
      }));

      callback(ok());
    });

    // -------------------------------------------------------------------------
    // REPLAY
    // -------------------------------------------------------------------------

    client.on(Events.REPLAY, function(_data, _callback) {

    });
  }
}
