/* eslint-disable no-unused-vars */

import validate from 'validation-unchained';
// import uuid from 'uuid/v4';

// import * as Types from './store/types';
import * as State from '../shared/store/state';
import * as Actions from '../shared/store/actions';
import * as Events from '../shared/events';
import { ok, badRequest, invalidRequest, invalidOperation, authRequired, anonRequired, notImplemented } from './responses';

export function connect(store) {
  return function(client) {

    client.on_auth = function(message, handler) {
      client.on(message, function(args, callback) {
        if (!client.user) callback(authRequired());
        handler(args, callback);
      });
    };

    client.on_anon = function(message, handler) {
      client.on(message, function(args, callback)
      {
        if (client.user) callback(anonRequired());
        handler(args, callback);
      });
    };

    // ------------------------------------------------------------------------
    // Connection
    // ------------------------------------------------------------------------

    (function() {
      client.emit(Events.SYSTEM, { message: 'Welcome' });
      client.broadcast.emit(Events.CLIENT_CONNECTED, {
        id: client.id,
        message: 'Connected'
      });
      store.dispatch(Actions.clientConnected(client));
    })();

    client.on(Events.DISCONNECT, function() {
      client.broadcast.emit(Events.CLIENT_DISCONNECTED, {
        id: client.id,
        message: 'Disconnected'
      });
      store.dispatch(Actions.clientDisconnected(client));
    });

    // ------------------------------------------------------------------------
    // Authentication
    // ------------------------------------------------------------------------

    client.on_anon(Events.AUTH_REGISTER, function(args, callback) {
      const { errors, data } = validate(args, {
        strict: true,
        rules: {
          userName: { type: String, required: true },
          password: { type: String, required: true, length: { min: 6, max: 255 } },
          playerName: { type: String, required: true },
          characterName: { type: String, required: true }
        }
      });
      if (errors) return callback(badRequest(errors));
      const { userName, password, playerName, characterName } = data;
      const user = store.getState().getIn([State.USERS, userName]);
      if (user) return callback(invalidOperation({ userName: ['User exists.'] }));

      const pr = Actions.playerRegistered({
        userName, playerName, characterName
      });
      const ur = Actions.userRegistered({
        userName, password
      });
      store.dispatch(ur);
      store.dispatch(pr);
      client.emit(Events.Event, pr);
      client.broadcast.emit(Events.Event, pr);
      callback(ok());
    });

    client.on_anon(Events.AUTH_LOGIN, function(args, callback) {
      const { errors, data } = validate(args, {
        strict: true,
        rules: {
          userName: { type: String, required: true },
          password: { type: String, required: true }
        }
      });
      if (errors) {
        return callback(badRequest(errors));
      }
      const user = store.getState().getIn([State.USERS, data.userName]);
      if (!user || user.get('password') != data.password) {
        return callback(invalidRequest({ userName: ['Unknown Username or Password'] }));
      }
      const e = Actions.playerConnected({ userName: data.userName });
      client.emit(Events.EVENT, e);
      client.broadcast.emit(Events.EVENT, e);
      callback(ok());
    });

    client.on_auth('auth:unregister', function(args, callback) {
    });

    client.on_auth('auth:logout', function(args, callback) {
    });

    // ------------------------------------------------------------------------
    // Game Management
    // ------------------------------------------------------------------------

    client.on_auth('game:list', function(args, callback) {
    });

    client.on_auth('game:select', function(args, callback) {
    });

    client.on_auth('game:open', function(args, callback) {
    });

    client.on_auth('game:close', function(args, callback) {
    });

    client.on_auth('game:create', function(args, callback) {
    });

    client.on_auth('game:delete', function(args, callback) {
    });

    // ------------------------------------------------------------------------
    // Event Pub/Sub
    // ------------------------------------------------------------------------

    client.on_auth('event:publish', function(args, callback) {
    });

  }
}
