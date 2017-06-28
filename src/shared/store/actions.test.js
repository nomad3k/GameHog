import { expect } from 'chai';
import * as Actions from './actions';
import * as Types from './types';

describe('Shared Actions', function() {

  // ---------------------------------------------------------------------------
  // stateResync
  // ---------------------------------------------------------------------------

  it('stateResync should return action', function() {
    let state = { foo: 1, bah: 2 };

    let subject = Actions.stateResync({ state, extra: 1 });

    expect(subject).to.deep.equal({
      type: Types.STATE_RESYNC,
      state
    });
    expect(subject.type).to.exist;
  });

  // ---------------------------------------------------------------------------
  // clientConnected
  // ---------------------------------------------------------------------------

  it('clientConnected should return action', function() {
    let id = '7dtf8yg9uhu9g7tg';

    let subject = Actions.clientConnected({ id, extra: 324 });

    expect(subject).to.deep.equal({
      type: Types.CLIENT_CONNECTED,
      id
    });
  });

  // ---------------------------------------------------------------------------
  // clientDisconnected
  // ---------------------------------------------------------------------------

  it('clientDisconnected should return action', function() {
    let id = '23fv53t4r23efethr6yt';

    let subject = Actions.clientDisconnected({ id });

    expect(subject).to.deep.equal({
      type: Types.CLIENT_DISCONNECTED,
      id
    });
    expect(subject.type).to.exist;
  });

  // ---------------------------------------------------------------------------
  // playerRegistered
  // ---------------------------------------------------------------------------

  it('playerRegistered should return action', function() {
    let userName = 'g8yvibhuo9g7u',
        playerName = '098f6tuvihbuoh97f86',
        characterName = '-908h9gyivuh jbvtc';

    let subject = Actions.playerRegistered({ userName, playerName, characterName });

    expect(subject).to.deep.equal({
      type: Types.PLAYER_REGISTERED,
      userName, playerName, characterName
    });
    expect(subject.type).to.exist;
  });

  // ---------------------------------------------------------------------------
  // playerUnregistered
  // ---------------------------------------------------------------------------

  it('playerUnregistered should return action', function() {
    let userName = 'sdfsfsdfsdfsfsEF2';

    let subject = Actions.playerUnregistered({ userName })

    expect(subject).to.deep.equal({
      type: Types.PLAYER_UNREGISTERED,
      userName
    });
    expect(subject.type).to.exist;
  });

  // ---------------------------------------------------------------------------
  // playerConnected
  // ---------------------------------------------------------------------------

  it('playerConnected should return action', function() {
    let userName = 'pijh9gyibhj8768ftyibui';

    let subject = Actions.playerConnected({ userName });

    expect(subject).to.deep.equal({
      type: Types.PLAYER_CONNECTED,
      userName
    });
    expect(subject.type).to.exist;
  });

  // ---------------------------------------------------------------------------
  // playerDisconnected
  // ---------------------------------------------------------------------------

  it('playerDisconnected should return action', function() {
    let userName = 'slkuibu897g8fyivb97g';

    let subject = Actions.playerDisconnected({ userName });

    expect(subject).to.deep.equal({
      type: Types.PLAYER_DISCONNECTED,
      userName
    });
    expect(subject.type).to.exist;
  });


  // ---------------------------------------------------------------------------
  // stateReset
  // ---------------------------------------------------------------------------

  it('stateReset should return action', function() {

    let subject = Actions.stateReset();

    expect(subject).to.deep.equal({
      type: Types.STATE_RESET
    });
    expect(subject.type).to.exist;
  });

});
