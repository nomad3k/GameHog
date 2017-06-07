import 'babel-polyfill'; // Required for generators to work.
import { expect } from 'chai';

import * as Actions from '../../shared/store/actions';
import * as Types from '../../shared/store/types';
import * as State from '../../shared/store/state';
import { connect } from '../../server/connection';
import * as Events from '../../shared/events';
import * as ResponseCodes from '../../shared/response-code';
import MockClient from './mock-client';
import MockStore from './mock-store';

function setup(initialiser) {
  const client = new MockClient();
  const store = new MockStore();
  const connection = connect(store);
  connection(client);
  if (initialiser) {
    for (let action of initialiser()) {
      store.dispatch(action);
    }
  }
  store.clear();
  client.clear();
  return { client, store };
}

describe('Client:Authentication', function() {

  // ---------------------------------------------------------------------------
  // Register - Success
  // ---------------------------------------------------------------------------

  describe('Register - Success', function() {
    const userName = 'xcvfd';
    const password = 'afgasdfasdf';
    const playerName = '3r2ronqfeow';
    const characterName = 'gfasdfaf';

    const { client, store } = setup();

    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_REGISTER, {
        userName,
        password,
        playerName,
        characterName
      }, r => {
        response = r;
        done();
      });
    });

    it('should register handlers', function() {
      expect(client.handlers[Events.AUTH_REGISTER]).to.exist;
    });

    it('should respond to the subject', function() {
      expect(response.ok).to.be.true;
      const args = client.getArgsForSingleEvent(Events.EVENT);
      expect(args).to.deep.equal({
        type: Types.PLAYER_REGISTERED,
        userName,
        playerName,
        characterName
      });
    });

    it('should inform the observers', function() {
      const args = client.broadcast.getArgsForSingleEvent(Events.EVENT);
      expect(args).to.deep.equal({
        type: Types.PLAYER_REGISTERED,
        userName,
        playerName,
        characterName
      });
    });

    it('should amend the state', function() {
      const { shared } = store.getState();
      const users = shared.get(State.USERS).toJS();
      const players = shared.get(State.PLAYERS).toJS();
      expect(users).to.deep.equal({
        [userName]: {
          password
        }
      });
      expect(players).to.deep.equal({
        [userName]: {
          playerName,
          characterName,
          connected: false
        }
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Register - Fail: Bad Request
  // ---------------------------------------------------------------------------

  describe('Register - Fail: Bad Request', function() {
    const { client, store } = setup();
    const { shared } = store.getState();

    let initialState = shared.toJS();
    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_REGISTER, { }, r => {
        response = r;
        done();
      });
    });

    it('should respond to the subject', function() {
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.BAD_REQUEST);
      expect(response.errors.userName).to.exist;
      expect(response.errors.password).to.exist;
      expect(response.errors.playerName).to.exist;
      expect(response.errors.characterName).to.exist;
    });

    it('should not inform the observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });

    it('should not amend the state', function() {
      expect(store.getState().shared.toJS()).to.deep.equal(initialState);
    });
  });

  // ---------------------------------------------------------------------------
  // Register - Fail: Already Registered
  // ---------------------------------------------------------------------------

  describe('Register - Fail: Already Registered', function() {
    const userName = 'foo';
    const { client, store } = setup(function* () {
      yield Actions.userRegistered({ userName, password: 'bah' });
      yield Actions.playerRegistered({ userName, playerName: 'Foo', characterName: 'Foo' });
    });

    let initialState = store.getState().shared.toJS();
    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_REGISTER, {
        userName,
        password: 'xxx',
        playerName: 'P',
        characterName: 'C'
      }, r => {
        response = r;
        done();
      });
    });

    it('should respond to the subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.INVALID_OPERATION);
      expect(response.message).to.exist;
      expect(response.errors.userName).to.exist;
    });

    it('should not inform the observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });

    it('should not amend the state', function() {
      expect(store.getState().shared.toJS()).to.deep.equal(initialState);
    });
  });

  // ---------------------------------------------------------------------------
  // Login - Success
  // ---------------------------------------------------------------------------

  describe('Login - Success', function() {
    const userName = 'xxx', password = 'yyy';
    const { client, store } = setup(function* () {
      yield Actions.userRegistered({ userName, password });
      yield Actions.playerRegistered({ userName, playerName: 'Foo', characterName: 'Foo' });
    });

    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_LOGIN, {
        userName,
        password
      }, r => {
        response = r;
        done();
      });
    });

    it('should set the client.user', function() {
      expect(client.user).to.exist;
    });

    it('should respond to the subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.true;
      expect(response.code).to.equal(ResponseCodes.OK);
    });

    it('should amend state', function() {
      const connected = store.getState().shared.getIn([State.PLAYERS, userName, 'connected']);
      expect(connected).to.be.true;
    });

    it('should inform the observers', function() {
      const args = client.broadcast.getArgsForSingleEvent(Events.EVENT);
      expect(args).to.deep.equal({
        type: Types.PLAYER_CONNECTED,
        userName
      });
    });

    it('should emit players to subject', function() {
      const args = client.getArgsForSingleEvent(Events.EVENT);
      expect(args).to.deep.equal({
        type: Types.PLAYER_CONNECTED,
        userName
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Login - Fail: Bad Request
  // ---------------------------------------------------------------------------

  describe('Login - Fail: Bad Request', function() {
    const { client, store } = setup(function* () {
      yield Actions.userRegistered({ userName: 'foo', password: 'bah' });
      yield Actions.playerRegistered({ userName: 'foo', playerName: 'Foo', characterName: 'Foo' });
    });

    let initialState = store.getState().shared.toJS();
    let response;
    before(function(done) {
      client.trigger(Events.AUTH_LOGIN, { }, r => {
        response = r;
        done();
      });
    });

    it('should respond to the subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.BAD_REQUEST);
    });

    it('should not inform the observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });

    it('should not amend the state', function() {
      expect(store.getState().shared.toJS()).to.deep.equal(initialState);
    });
  });

  // ---------------------------------------------------------------------------
  // Login - Fail: Unknown user
  // ---------------------------------------------------------------------------

  describe('Login - Fail: Unknown user', function() {
    const { client, store } = setup();

    let initialState = store.getState().shared.toJS();
    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_LOGIN, {
        userName: 'unknown',
        password: 'irrelevant'
      }, r => {
        response = r;
        done();
      });
    });

    it('should respond to the subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.INVALID_REQUEST);
    });

    it('should not inform the observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });

    it('should not amend the state', function() {
      expect(store.getState().shared.toJS()).to.deep.equal(initialState);
    });
  });

  // ---------------------------------------------------------------------------
  // Login - Fail: Invalid password
  // ---------------------------------------------------------------------------

  describe('Login - Fail: Invalid password', function() {
    const userName = 'foo';
    const { client, store } = setup(function* () {
      yield Actions.userRegistered({ userName, password: 'bah' });
      yield Actions.playerRegistered({ userName, playerName: 'Foo', characterName: 'Foo' });
    });

    let initialState = store.getState().shared.toJS();
    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_LOGIN, {
        userName,
        password: 'incorrect'
      }, r => {
        response = r;
        done();
      });
    });

    it('should respond to client', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.INVALID_REQUEST);
    });

    it('should not inform the observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });

    it('should not amend the state', function() {
      expect(store.getState().shared.toJS()).to.deep.equal(initialState);
    });
  });

  // ---------------------------------------------------------------------------
  // Logout - Success
  // ---------------------------------------------------------------------------

  describe('Logout - Success', function() {
    const userName = 'foo', password = 'bah';

    const { client, store } = setup(function*() {
      yield Actions.userRegistered({ userName, password });
      yield Actions.playerRegistered({ userName, playerName: 'Foo', characterName: 'Foo' });
    });

    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_LOGIN, {
        userName,
        password
      }, _r => {
        client.clear();
        client.broadcast.clear();
        client.trigger(Events.AUTH_LOGOUT, {
        }, r2 => {
          response = r2;
          done();
        });
      });
    });

    it('should register the handlers', function() {
      expect(client.handlers[Events.AUTH_LOGOUT]).to.exist;
    });

    it('should remove the client.user', function() {
      expect(client.user).to.not.exist;
    });

    it('should respond to the subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.true;
      expect(response.code).to.equal(ResponseCodes.OK);
    });

    it('should amend state', function() {
      const state = store.getState().shared;
      const player = state.getIn([State.PLAYERS, userName]).toJS();
      expect(player).to.exist;
      expect(player.connected).to.be.false;
    });

    it('should notify the subject', function() {
      const args = client.getArgsForSingleEvent(Events.EVENT);
      expect(args).to.exist;
      expect(args.type).to.equal(Types.PLAYER_DISCONNECTED);
    });

    it('should notify observers', function() {
      const args = client.broadcast.getArgsForSingleEvent(Events.EVENT);
      expect(args).to.exist;
      expect(args.type).to.equal(Types.PLAYER_DISCONNECTED);
    });
  });

  // ---------------------------------------------------------------------------
  // Logout - Fail: Not logged in
  // ---------------------------------------------------------------------------

  describe('Logout - Fail: Not logged in', function() {

    const { client, store } = setup();

    let initialState = store.getState().shared.toJS();
    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_LOGOUT, { }, r => {
        response = r;
        done();
      });
    });

    it('should respond to the subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.AUTH_REQUIRED);
    });

    it('should not inform the observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });

    it('should not amend the state', function() {
      expect(store.getState().shared.toJS()).to.deep.equal(initialState);
    });
  });
});
