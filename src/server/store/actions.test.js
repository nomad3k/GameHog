import { expect } from 'chai';
import * as Actions from './actions';
import * as Types from './types';

describe('Server Actions', function() {

  // ---------------------------------------------------------------------------
  // userRegistered
  // ---------------------------------------------------------------------------

  it('userRegistered should return action', function() {
    let userName = 'foo', password = 'bah';

    let subject = Actions.userRegistered({ userName, password });

    expect(subject).to.deep.equal({
      type: Types.USER_REGISTERED,
      userName, password
    });
    expect(subject.type).to.exist;
  });

  // ---------------------------------------------------------------------------
  // userUnregistered
  // ---------------------------------------------------------------------------

  it('userUnregistered should return action', function() {
    let userName = 'sdfsfsd';

    let subject = Actions.userUnregistered({ userName });

    expect(subject).to.deep.equal({
      type: Types.USER_UNREGISTERED,
      userName
    });
    expect(subject.type).to.exist;
  });

});
