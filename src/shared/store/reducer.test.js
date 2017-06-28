import { createStore } from 'redux';
import { expect } from 'chai';
import * as Actions from './actions';
import reducer from './reducer';

describe('Shared Actions', function() {

  let store = null;
  beforeEach(function() {
    store = createStore(reducer);
  })

  // ---------------------------------------------------------------------------
  // stateResync
  // ---------------------------------------------------------------------------

  it('stateResync should amend state', function() {
    let newState = { foo: 1, bah: 2 };

    store.dispatch(Actions.stateResync({ state: newState }));

    let state = store.getState().toJS();

    expect(state).to.deep.equal(state);
  });

  // ---------------------------------------------------------------------------
  // clientConnected
  // ---------------------------------------------------------------------------

  it('clientConnected should amend state', function() {
    let id = '7dtf8yg9uhu9g7tg';

    store.dispatch(Actions.clientConnected({ id }));

    let state = store.getState().toJS();

    expect(state.clients).to.deep.equal({
      [id]: { }
    });
  });

  // ---------------------------------------------------------------------------
  // clientDisconnected
  // ---------------------------------------------------------------------------

  it('clientDisconnected should amend state', function() {
    let id = '23fv53t4r23efethr6yt';

    store.dispatch(Actions.clientDisconnected({ id }));

    let state = store.getState().toJS();
    expect(state.clients).to.deep.equal({
    });
  });

  // ---------------------------------------------------------------------------
  // playerRegistered
  // ---------------------------------------------------------------------------

  it('playerRegistered should amend state', function() {
    let userName = 'g8yvibhuo9g7u',
        playerName = '098f6tuvihbuoh97f86',
        characterName = '-908h9gyivuh jbvtc';

    store.dispatch(Actions.playerRegistered({ userName, playerName, characterName }));

    let state = store.getState().toJS();
    expect(state.players).to.deep.equal({
      [userName]:  { playerName, characterName, connected: false }
    });
  });

  // ---------------------------------------------------------------------------
  // playerUnregistered
  // ---------------------------------------------------------------------------

  it('playerUnregistered should amend state', function() {
    let userName = 'sdfsfsdfsdfsfsEF2',
        playerName = '098f6tuvihbuoh97f86',
        characterName = '-908h9gyivuh jbvtc';
    store.dispatch(Actions.playerRegistered({ userName, playerName, characterName }));

    store.dispatch(Actions.playerUnregistered({ userName }));

    let state = store.getState().toJS();
    expect(state.players).to.deep.equal({
    });
  });

  // ---------------------------------------------------------------------------
  // playerConnected
  // ---------------------------------------------------------------------------

  it('playerConnected should amend state', function() {
    let userName = 'sdfsfsdfsdfsfsEF2',
        playerName = '098f6tuvihbuoh97f86',
        characterName = '-908h9gyivuh jbvtc';
    store.dispatch(Actions.playerRegistered({ userName, playerName, characterName }));

    store.dispatch(Actions.playerConnected({ userName }));

    let state = store.getState().toJS();
    expect(state.players).to.deep.equal({
      [userName]: { playerName, characterName, connected: true }
    });
  });

  // ---------------------------------------------------------------------------
  // playerDisconnected
  // ---------------------------------------------------------------------------

  it('playerDisconnected should amend state', function() {
    let userName = 'sdfsfsdfsdfsfsEF2',
        playerName = '098f6tuvihbuoh97f86',
        characterName = '-908h9gyivuh jbvtc';
    store.dispatch(Actions.playerRegistered({ userName, playerName, characterName }));
    store.dispatch(Actions.playerConnected({ userName }));

    store.dispatch(Actions.playerDisconnected({ userName }));

    let state = store.getState().toJS();
    expect(state.players).to.deep.equal({
      [userName]: { playerName, characterName, connected: false }
    });
  });


  // ---------------------------------------------------------------------------
  // stateReset
  // ---------------------------------------------------------------------------

  it('stateReset should amend state', function() {

    store.dispatch(Actions.stateReset());

    let state = store.getState().toJS();
    expect(state).to.deep.equal({
      clients: { },
      players: { }
    });
  });

});
