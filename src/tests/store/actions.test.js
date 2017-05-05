import { expect } from 'chai';

import * as Types from '../../client/store/types';
import * as Actions from '../../client/store/actions';
import createStore from '../../client/store/store';

describe('Actions', function() {

  describe('Loading', function() {

    describe(Types.LOADING_START, function() {
      it('should generate the action', function() {
        var actual = Actions.loadingStart();
        expect(actual).to.deep.equal({ type: Types.LOADING_START });
      });
      it('should increment the state', function() {
        var store = createStore({ loading: 0 });
        store.dispatch(Actions.loadingStart());
        expect(store.getState().loading).to.equal(1);
      });
    });

    describe(Types.LOADING_STOP, function() {
      it('should generate the action', function() {
        var actual = Actions.loadingStop();
        expect(actual).to.deep.equal({ type: Types.LOADING_STOP });
      });
      it('should decrement the state', function() {
        var store = createStore({ loading: 3 });
        store.dispatch(Actions.loadingStop());
        expect(store.getState().loading).to.equal(2);
      });
    });

  });

});
