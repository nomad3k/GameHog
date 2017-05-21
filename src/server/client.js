import validate from 'validation-unchained';

import * as Actions from './store/actions';
import * as Events from '../shared/events';
import { ok, badRequest, invalidRequest } from './responses';

export function connect(store) {
  return function(client) {
    // -------------------------------------------------------------------------
    // CONNECT
    // -------------------------------------------------------------------------

    (function(){
      const msg = { id: client.id, message: 'Connected' };
      client.emit(Events.CLIENT_CONNECTED, msg);
      client.broadcast.emit(Events.CLIENT_CONNECTED, msg);
      store.dispatch(Actions.clientConnected({ client: client.id }));
    })();

    // -------------------------------------------------------------------------
    // DISCONNECT
    // -------------------------------------------------------------------------

    client.on('disconnect', function() {
      const msg = { id: client.id, message: 'Disconnected' };
      client.broadcast.emit(Events.CLIENT_DISCONNECTED, msg);
      store.dispatch(Actions.clientDisconnected({ client: client.id }));
    });

    // -------------------------------------------------------------------------
    // ECHO
    // -------------------------------------------------------------------------

    client.on(Events.ECHO, function(data, callback) {
      client.emit(Events.ECHO, data);
      callback(data);
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
