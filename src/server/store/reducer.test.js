import { createStore } from 'redux';
import { expect } from 'chai';
import * as Actions from './actions';
import reducer from './reducer';

describe('Server Reducer', function() {

  let store = null;
  before(function() {
    store = createStore(reducer);
  })

  // ---------------------------------------------------------------------------
  // userRegistered
  // ---------------------------------------------------------------------------

  it('userRegistered should amend state', function() {
    // arrange
    let userName = 'foo', password = 'bah';
   // act
    store.dispatch(Actions.userRegistered({ userName, password }));
    // assert
    let state = store.getState().toJS();
    expect(state.users).to.exist;
    expect(state.users[userName]).to.deep.equal({
      password
    });
  });

  // ---------------------------------------------------------------------------
  // userUnregistered
  // ---------------------------------------------------------------------------

  it('userUnregistered should amend state', function() {
    // arrange
    let userName = 'foo', password = 'bah';
    store.dispatch(Actions.userRegistered({ userName, password }));
    // act
    store.dispatch(Actions.userUnregistered({ userName }));
    // assert
    let state = store.getState().toJS();
    expect(state.users).to.deep.equal({ });
  });

});
