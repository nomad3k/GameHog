import { expect } from 'chai';

import * as Types from '../../client/store/types';

describe('Client Types', function() {

  it('should have unique values', function() {
    let reverse = { };
    let duplicates = [ ];
    for (let type in Types) {
      let value = Types[type];
      if (reverse[value]) {
        duplicates.push(value);
        reverse[value] = type;
      } else {
        reverse[value] = [type];
      }
    }
    expect(duplicates).to.be.empty;
  });

});
