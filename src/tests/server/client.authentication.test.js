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
    const { client, store } = setup();

    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_REGISTER, {
        userName: 'u',
        password: 'pwd',
        playerName: 'p',
        characterName: 'c'
      }, r => {
        response = r;
        done();
      });
    });

    it('should register handlers', function() {
      expect(client.handlers[Events.AUTH_REGISTER]).to.exist;
    });

    it('should acknowledge the subject', function() {
      expect(response.ok).to.be.true;
      const args = client.getArgsForSingleEvent(Events.EVENT);
      expect(args).to.deep.equal({
        type: Types.PLAYER_REGISTERED,
        userName: 'u',
        playerName: 'p',
        characterName: 'c'
      });
    });

    it('should inform observers', function() {
      const args = client.broadcast.getArgsForSingleEvent(Events.EVENT);
      expect(args).to.deep.equal({
        type: Types.PLAYER_REGISTERED,
        userName: 'u',
        playerName: 'p',
        characterName: 'c'
      });
    });

    it('should amend the state', function() {
      const users = store.getState().get(State.USERS).toJS();
      const players = store.getState().get(State.PLAYERS).toJS();
      expect(users).to.deep.equal({
        u: {
          password: 'pwd'
        }
      });
      expect(players).to.deep.equal({
        'u': {
          playerName: 'p',
          characterName: 'c',
          connected: false
        }
      });
    });
  });

  // ---------------------------------------------------------------------------
  // Register - Fail: Bad Request
  // ---------------------------------------------------------------------------

  describe('Register - Fail: Bad Request', function() {
    const { client } = setup();

    let response = null;
    before(function(done) {
      client.trigger(Events.AUTH_REGISTER, { }, r => {
        response = r;
        done();
      });
    });

    it('should inform the subject', function() {
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.BAD_REQUEST);
      expect(response.errors.userName).to.exist;
      expect(response.errors.password).to.exist;
      expect(response.errors.playerName).to.exist;
      expect(response.errors.characterName).to.exist;
    });

    it('should not inform observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });
  });

  // ---------------------------------------------------------------------------
  // Register - Fail: Already Registered
  // ---------------------------------------------------------------------------

  describe('Register - Fail: Already Registered', function() {
    const userName = 'foo';
    const { client } = setup(function* () {
      yield Actions.userRegistered({ userName, password: 'bah' });
      yield Actions.playerRegistered({ userName, playerName: 'Foo', characterName: 'Foo' });
    });

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

    it('should inform the subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.INVALID_OPERATION);
      expect(response.message).to.exist;
      expect(response.errors.userName).to.exist;
    });

    it('should not inform observers', function() {
      expect(client.broadcast.events).to.be.empty;
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

    it('should inform subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.true;
      expect(response.code).to.equal(ResponseCodes.OK);
    });

    it('should amend state', function() {
      const connected = store.getState().getIn([State.PLAYERS, userName, 'connected']);
      expect(connected).to.be.true;
    });

    it('should inform observers', function() {
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
    const { client } = setup(function* () {
      yield Actions.userRegistered({ userName: 'foo', password: 'bah' });
      yield Actions.playerRegistered({ userName: 'foo', playerName: 'Foo', characterName: 'Foo' });
    });

    let response;
    before(function(done) {
      client.trigger(Events.AUTH_LOGIN, { }, r => {
        response = r;
        done();
      });
    });

    it('should inform the subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.BAD_REQUEST);
    });

    it('should not inform observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });
  });

  // ---------------------------------------------------------------------------
  // Login - Fail: Unknown user
  // ---------------------------------------------------------------------------

  describe('Login - Fail: Unknown user', function() {
    const { client } = setup();

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

    it('should inform the subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.false;
      expect(response.code).to.equal(ResponseCodes.INVALID_REQUEST);
    });

    it('should not inform observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });
  });

  // ---------------------------------------------------------------------------
  // Login - Fail: Invalid password
  // ---------------------------------------------------------------------------

  describe('Login - Fail: Invalid password', function() {
    const userName = 'foo';
    const { client } = setup(function* () {
      yield Actions.userRegistered({ userName, password: 'bah' });
      yield Actions.playerRegistered({ userName, playerName: 'Foo', characterName: 'Foo' });
    });

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

    it('should not inform observers', function() {
      expect(client.broadcast.events).to.be.empty;
    });
  });

  // ---------------------------------------------------------------------------
  // Login - Fail: Bad Request
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

    it('should remove the client.user', function() {
      expect(client.user).to.not.exist;
    });

    it('should inform subject', function() {
      expect(response).to.exist;
      expect(response.ok).to.be.true;
      expect(response.code).to.equal(ResponseCodes.OK);
    });

    it('should amend state', function() {
      const state = store.getState();
      const player = state.getIn([State.PLAYERS, userName]).toJS();
      expect(player).to.exist;
      expect(player.connected).to.be.false;
    });

    it('should notify observers', function() {
      const args = client.broadcast.getArgsForSingleEvent(Events.EVENT);
      expect(args).to.exist;
      expect(args.type).to.equal(Types.PLAYER_DISCONNECTED);
    });
  });

});
