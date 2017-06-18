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
        if (!client.user) return callback(authRequired());
        handler(client.user, args, callback);
      });
    };

    client.on_anon = function(message, handler) {
      client.on(message, function(args, callback)
      {
        if (client.user) return callback(anonRequired());
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
      if (client.user) {
        const { userName } = client.user;
        const pd = Actions.playerDisconnected({ userName });
        store.dispatch(pd);
        client.broadcast.emit(Events.EVENT, pd);
      }
    });

    // ------------------------------------------------------------------------
    // AUTH_REGISTER
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
      const user = store.getState().shared.getIn([State.USERS, userName]);
      if (user) return callback(invalidOperation({ userName: ['User exists.'] }));

      const pr = Actions.playerRegistered({
        userName, playerName, characterName
      });
      const ur = Actions.userRegistered({
        userName, password
      });
      store.dispatch(ur);
      store.dispatch(pr);
      client.emit(Events.EVENT, pr);
      client.broadcast.emit(Events.EVENT, pr);
      callback(ok());
    });

    // -------------------------------------------------------------------------
    // AUTH_UNREGISTER
    // -------------------------------------------------------------------------

    client.on_auth(Events.AUTH_UNREGISTER, function(user, args, callback) {
      const uu = Actions.userUnregistered({ userName: user.userName });
      const pu = Actions.playerUnregistered({ userName: user.userName });
      delete client.user;
      store.dispatch(uu);
      store.dispatch(pu);
      client.emit(Events.EVENT, pu);
      client.broadcast.emit(Events.EVENT, pu);
      callback(ok());
    });

    // -------------------------------------------------------------------------
    // AUTH_LOGIN
    // -------------------------------------------------------------------------

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
      const user = store.getState().shared.getIn([State.USERS, data.userName]);
      if (!user || user.get('password') != data.password) {
        return callback(invalidRequest({ userName: ['Unknown Username or Password'] }));
      }
      const player = store.getState().shared.getIn([State.PLAYERS, data.userName]);
      if (player.get('connected')) {
        return callback(invalidRequest({ userName: ['Player already connected']}));
      }
      client.user = { userName: data.userName };
      const e = Actions.playerConnected({ userName: data.userName });
      store.dispatch(e);
      const players = store.getState().shared.get(State.PLAYERS).toJS();
      const users = Object.getOwnPropertyNames(players);
      users.forEach(userName => {
        const player = players[userName];
        client.emit(Events.EVENT, Actions.playerRegistered(Object.assign({ userName }, player)));
        if (player.connected) {
          client.emit(Events.EVENT, Actions.playerConnected({ userName }));
        }
      });
      client.emit(Events.EVENT, e);
      client.broadcast.emit(Events.EVENT, e);
      callback(ok(client.user));
    });

    // -------------------------------------------------------------------------
    // AUTH_LOGOUT
    // -------------------------------------------------------------------------

    client.on_auth(Events.AUTH_LOGOUT, function(user, args, callback) {
      const pd = Actions.playerDisconnected({ userName: user.userName });
      delete client.user;
      store.dispatch(pd);
      client.emit(Events.EVENT, pd);
      client.broadcast.emit(Events.EVENT, pd);
      callback(ok());
    });

  }
}
