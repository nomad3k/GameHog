import { expect } from 'chai';

import createStore from '../../shared/store/store';
import * as Actions from '../../shared/store/actions';
import * as Types from '../../shared/store/types';
import * as State from '../../shared/store/state';

describe('Shared Actions', function() {

  // --------------------------------------------------------------------------
  // clientConnected
  // --------------------------------------------------------------------------

  describe('clientConnected', function() {

    it('clientConnected - Success', function() {
      let id = '34r4lqrkn4r';
      let action = Actions.clientConnected({ id });
      expect(action).to.exist;
      expect(action.type).to.exist;
      expect(action).to.deep.equal({
        type: Types.CLIENT_CONNECTED,
        id
      });
    });

    it('clientConnected - Missing Parameters', function() {
      expect(() => Actions.clientConnected()).to.throw();
      expect(() => Actions.clientConnected({ })).to.throw();
    });

    it('clientConnected - Amends state', function() {
      // Arrange
      const id = 'asasffafasdf';
      const store = createStore();
      // Act
      store.dispatch(Actions.clientConnected({ id }));
      // Assert
      const client = store.getState().getIn([State.CLIENTS, id]);
      expect(client).to.exist;
      expect(client.toJS()).to.deep.equal({ });
    });

  });

  // --------------------------------------------------------------------------
  // clientDisconnected
  // --------------------------------------------------------------------------

  describe('clientDisconnected', function() {
    it('clientDisconnected - Success', function() {
      let id = 'pmfpasdf';
      let action = Actions.clientDisconnected({ id });
      expect(action).to.exist;
      expect(action.type).to.exist;
      expect(action).to.deep.equal({
        type: Types.CLIENT_DISCONNECTED,
        id: id
      });
    });

    it('clientDisconnected - Missing Parameters', function() {
      expect(() => Actions.clientDisconnected()).to.throw();
      expect(() => Actions.clientDisconnected({ })).to.throw();
    });

    it('clientDisconnected - Amends state', function() {
      // Arrange
      const id = 'afdalkndsfpadsf';
      const store = createStore();
      store.dispatch(Actions.clientConnected({ id }));
      // Act
      store.dispatch(Actions.clientDisconnected({ id }));
      // Assert
      const client = store.getState().getIn([State.CLIENTS, id]);
      expect(client).to.not.exist;
    });

  });

  // --------------------------------------------------------------------------
  // userRegistered
  // --------------------------------------------------------------------------

  describe('userRegistered', function() {

    it('userRegistered - Success', function() {
      const userName = '3[pm45pmt]';
      const password = 'aspmapvfvk';
      let action = Actions.userRegistered({ userName, password });
      expect(action).to.exist;
      expect(action.type).to.exist;
      expect(action).to.deep.equal({
        type: Types.USER_REGISTERED,
        userName, password
      });
    });

    it('userRegistered - Missing Parameters', function() {
      const userName = '3[pm45pmt]';
      const password = 'aspmapvfvk';
      expect(() => Actions.userRegistered()).to.throw();
      expect(() => Actions.userRegistered({ userName })).to.throw();
      expect(() => Actions.userRegistered({ password })).to.throw();
    });

    it('userRegistered - Amends state', function() {
      // Arrange
      const store = createStore();
      const userName = '3[pm45pmt]';
      const password = 'aspmapvfvk';
      // Act
      store.dispatch(Actions.userRegistered({ userName, password }));
      // Assert
      const user = store.getState().getIn([State.USERS, userName]);
      expect(user).to.exist;
      expect(user.toJS()).to.deep.equal({
        password: password
      });
    });

  });

  // --------------------------------------------------------------------------
  // userUnregistered
  // --------------------------------------------------------------------------

  describe('userUnregistered', function() {

    it('userUnregistered - Success', function() {
      const userName = 'aq4m34qp';
      let action = Actions.userUnregistered({ userName });
      expect(action).to.exist;
      expect(action.type).to.exist;
      expect(action).to.deep.equal({
        type: Types.USER_UNREGISTERED,
        userName
      });
    });

    it('userUnregistered - Missing Parameters', function() {
      expect(() => Actions.userUnregistered()).to.throw();
      expect(() => Actions.userUnregistered({ })).to.throw();
    });

    it('userUnregistered - Amends state', function() {
      // Arrange
      const store = createStore();
      const userName = '3[pm45pmt]';
      const password = 'aspmapvfvk';
      store.dispatch(Actions.userRegistered({ userName, password }));
      // Act
      store.dispatch(Actions.userUnregistered({ userName }));
      // Assert
      const user = store.getState().getIn([State.USERS, userName]);
      expect(user).to.not.exist;
    });
  });

  // --------------------------------------------------------------------------
  // playerRegistered
  // --------------------------------------------------------------------------

  describe('playerRegistered', function() {

    it('playerRegistered - Success', function() {
      const userName = 'penfv';
      const playerName = 'pergpin';
      const characterName = '45k4';
      let action = Actions.playerRegistered({ userName, playerName, characterName });
      expect(action).to.exist;
      expect(action.type).to.exist;
      expect(action).to.deep.equal({
        type: Types.PLAYER_REGISTERED,
        userName, playerName, characterName
      });
    });

    it('playerRegistered - Missing Parameters', function() {
      const userName = 'penfv';
      const playerName = 'pergpin';
      const characterName = '45k4';
      expect(() => Actions.playerRegistered());
      expect(() => Actions.playerRegistered({ playerName, characterName }));
      expect(() => Actions.playerRegistered({ userName, characterName }));
      expect(() => Actions.playerRegistered({ userName, playerName }));
    });

    it('playerRegistered - Amends state', function() {
      // Arrange
      const store = createStore();
      const userName = 'penfv';
      const playerName = 'pergpin';
      const characterName = '45k4';
      // Act
      store.dispatch(Actions.playerRegistered({ userName, playerName, characterName }));
      // Assert
      const player = store.getState().getIn([State.PLAYERS, userName]);
      expect(player).to.exist;
      expect(player.toJS()).to.deep.equal({
        playerName,
        characterName,
        connected: false
      });
    });

  });

  // --------------------------------------------------------------------------
  // playerUnregistered
  // --------------------------------------------------------------------------

  describe('playerUnregistered', function() {

    it('playerUnregistered - Success', function() {
      const userName = 'fghfghjfghj';
      let action = Actions.playerUnregistered({ userName });
      expect(action).to.exist;
      expect(action.type).to.exist;
      expect(action).to.deep.equal({
        type: Types.PLAYER_UNREGISTERED,
        userName
      });
    });

    it('playerUnregistered - Missing Parameters', function() {
      expect(() => Actions.playerUnregistered()).to.throw();
      expect(() => Actions.playerUnregistered({ })).to.throw();
    });

    it('playerUnregistered - Amends state', function() {
      // Arrange
      const store = createStore();
      const userName = 'penfv';
      const playerName = 'pergpin';
      const characterName = '45k4';
      store.dispatch(Actions.playerRegistered({ userName, playerName, characterName }));
      // Act
      store.dispatch(Actions.playerUnregistered({ userName }));
      // Assert
      const player = store.getState().getIn([State.PLAYERS, userName]);
      expect(player).to.not.exist;
    });
});

  // --------------------------------------------------------------------------
  // playerConnected
  // --------------------------------------------------------------------------

  describe('playerConnected', function() {

    it('playerConnected - Success', function() {
      const userName = 'asfsfasdfasd';
      let action = Actions.playerConnected({ userName });
      expect(action).to.exist;
      expect(action.type).to.exist;
      expect(action).to.deep.equal({
        type: Types.PLAYER_CONNECTED,
        userName
      });
    });

    it('playerConnected - Missing Parameters', function() {
      expect(() => Actions.playerConnected()).to.throw();
      expect(() => Actions.playerConnected({ })).to.throw();
    });

    it('playerConnected - Amends state', function() {
      // Arrange
      const store = createStore();
      const userName = 'penfv';
      const playerName = 'pergpin';
      const characterName = '45k4';
      store.dispatch(Actions.playerRegistered({ userName, playerName, characterName }));
      // Act
      store.dispatch(Actions.playerConnected({ userName }));
      // Assert
      const player = store.getState().getIn([State.PLAYERS, userName]);
      expect(player).to.exist;
      expect(player.get('connected')).to.be.true;
    });

  });

  // --------------------------------------------------------------------------
  // playerDisconnected
  // --------------------------------------------------------------------------

  describe('playerDisconnected', function() {

    it('playerDisconnected - Success', function() {
      const userName = 'sddsfsf';
      let action = Actions.playerDisconnected({ userName });
      expect(action).to.exist;
      expect(action.type).to.exist;
      expect(action).to.deep.equal({
        type: Types.PLAYER_DISCONNECTED,
        userName
      });
    });

    it('playerDisconnected - Success', function() {
      expect(() => Actions.playerDisconnected()).to.throw();
      expect(() => Actions.playerDisconnected({ })).to.throw();
    });

    it('playerConnected - Amends state', function() {
      // Arrange
      const store = createStore();
      const userName = 'penfv';
      const playerName = 'pergpin';
      const characterName = '45k4';
      store.dispatch(Actions.playerRegistered({ userName, playerName, characterName }));
      store.dispatch(Actions.playerConnected({ userName }));
      // Act
      store.dispatch(Actions.playerDisconnected({ userName }));
      // Assert
      const player = store.getState().getIn([State.PLAYERS, userName]);
      expect(player).to.exist;
      expect(player.get('connected')).to.be.false;
    });

  });

});
