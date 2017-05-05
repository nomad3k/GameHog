import { expect } from 'chai';
import * as Types from '../../client/store/types';

describe('Types', function() {

  it('should be unique', function() {
    var duplicates = [];
    var values = { };
    for (var t in Types) {
      var v = Types[t];
      if (!values[v]) {
        values[v] = [t];
      } else {
        values[v].push(t);
        if (duplicates.indexOf(v) === -1) {
          duplicates.push(v);
        }
      }
    }
    expect(duplicates.map(v => values[v])).to.deep.equal([]);
  });

});
