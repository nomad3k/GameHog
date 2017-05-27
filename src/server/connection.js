/* eslint-disable no-unused-vars */

import validate from 'validation-unchained';
// import uuid from 'uuid/v4';

// import * as Types from './store/types';
import * as Actions from '../shared/store/actions';
import * as Events from '../shared/events';
import { ok, authRequired, anonRequired, notImplemented } from './responses';

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

    client.on_anon(Events.AUTH_REGISTER, function({ userName, password, playerName, characterName }, callback) {
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

    client.on_auth('auth:unregister', function(args, callback) {
    });

    client.on_anon('auth:login', function(args, callback) {
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
