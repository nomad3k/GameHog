import { expect } from 'chai';

import * as Actions from '../../shared/store/actions';
import * as Types from '../../shared/store/types';

describe('Shared Actions', function() {

  it('clientConnected - Success', function() {
    let client = { id: '34r4lqrkn4r' };
    let action = Actions.clientConnected(client);
    expect(action).to.exist;
    expect(action.type).to.exist;
    expect(action.type).to.deep.equal(Types.CLIENT_CONNECTED);
    expect(action.id).to.deep.equal(client.id);
  });

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

});
