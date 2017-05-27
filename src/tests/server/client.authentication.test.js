import { expect } from 'chai';

import * as Types from '../../shared/store/types';
import * as State from '../../shared/store/state';
import { connect } from '../../server/connection';
import * as Events from '../../shared/events';
import * as ResponseCodes from '../../shared/response-code';
import MockClient from './mock-client';
import MockStore from './mock-store';

describe('Client:Authentication', function() {

  describe('Register - Success', function() {
    const client = new MockClient();
    const store = new MockStore();
    const connection = connect(store);
    connection(client);
    let response = null;

    before(function(done) {
      const request = {
        userName: 'u',
        password: 'pwd',
        playerName: 'p',
        characterName: 'c'
      };
      client.trigger(Events.AUTH_REGISTER, request, r => {
        response = r;
        done();
      });
    });

    it('should register handlers', function() {
      expect(client.handlers[Events.AUTH_REGISTER]).to.not.be.undefined;
    });
    it('should acknowledge the subject', function() {
      expect(response.ok).to.be.true;
      const args = client.getArgsForSingleEvent(Events.PLAYER_REGISTERED);
      expect(args).to.deep.equal({
        type: Types.PLAYER_REGISTERED,
        userName: 'u',
        playerName: 'p',
        characterName: 'c'
      });
    });
    it('should inform observers', function() {
      const args = client.broadcast.getArgsForSingleEvent(Events.PLAYER_REGISTERED);
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
          characterName: 'c'
        }
      });
    });
  });

  describe('Register - Fail: Bad Request', function() {
    const client = new MockClient();
    const store = new MockStore();
    const connection = connect(store);
    connection(client);
    store.clear();
    client.clear();
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
      expect(response.errors.userName).to.not.be.undefined;
      expect(response.errors.password).to.not.be.undefined;
      expect(response.errors.playerName).to.not.be.undefined;
      expect(response.errors.characterName).to.not.be.undefined;
    });
  });

  // describe('Register - Fail: Already Registered', function() {
  //   const client = new MockClient();
  //   const store = new MockStore();
  //   const connection = connect(store);
  //   connection(client);
  //
  //   it('should inform the subject', function() {});
  // });

  // describe('Unregister', function() {
  //   it('should acknowledge the subject', function() {});
  //   it('should inform observers', function() { });
  //   it('should amend the state', function() { });
  // });
  //
  // describe('Login', function() {
  //   before(function() {
  //   });
  //   it('should inform observers', function() {
  //   });
  //   it('should emit players to subject', function() {
  //   });
  //   it('should emit documents to subject', function() {
  //   });
  // });
  //
  // describe('Logout', function() {
  //   before(function() {
  //   });
  //   it('should inform observers', function() {
  //   });
  //   it('should reset subject', function() {
  //   });
  // });

});
