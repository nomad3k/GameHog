import { expect } from 'chai';

import * as State from '../../shared/store/state';
import { connect } from '../../server/connection';
import * as Events from '../../shared/events';
import MockClient from './mock-client';
import MockStore from './mock-store';

describe('Gamehog', function() {

  describe('Server', function() {

    // describe('Authentication', function() {
    //
    //   describe('Register', function() {
    //     it('should acknowledge the subject', function() {});
    //     it('should inform observers', function() { });
    //     it('should amend the state', function() { });
    //   });
    //
    //   describe('Unregister', function() {
    //     it('should acknowledge the subject', function() {});
    //     it('should inform observers', function() { });
    //     it('should amend the state', function() { });
    //   });
    //
    //   describe('Login', function() {
    //     before(function() {
    //     });
    //     it('should inform observers', function() {
    //     });
    //     it('should emit players to subject', function() {
    //     });
    //     it('should emit documents to subject', function() {
    //     });
    //   });
    //
    //   describe('Logout', function() {
    //     before(function() {
    //     });
    //     it('should inform observers', function() {
    //     });
    //     it('should reset subject', function() {
    //     });
    //   });
    //
    // });
    //
    // describe('Games', function() {
    //
    //   describe('List Games', function() {
    //     context('Success', function() {
    //       it('should return list of games', function() {
    //       });
    //     });
    //     context('Failure: Unauthenticated', function() {
    //       it('should return authenitcation error', function() {
    //       });
    //     });
    //     context('Failure: Unauthorised', function() {
    //       it('should return authorisation error', function() {
    //       });
    //     });
    //   });
    //
    //   describe('Select Game', function() {
    //     context('Success', function() {
    //       it('should acknowledge the subject', function() {});
    //       it('should amend the state', function() {});
    //     });
    //     context('Failure: Unauthenticated', function() {
    //       it('should return authenitcation error', function() {});
    //     });
    //     context('Failure: Unauthorised', function() {
    //       it('should return authorisation error', function() {});
    //     });
    //     context('Failure: Open Game', function() {
    //       it('should return invalidOperation error', function() {});
    //     });
    //   });
    //
    //   describe('Create Game', function() {
    //     context('Success', function() {
    //       it('should acknowledge the subject', function() {});
    //       it('should amend the state', function() {});
    //     });
    //     context('Failure: Unauthenticated', function() {
    //       it('should return authenitcation error', function() {});
    //     });
    //     context('Failure: Unauthorised', function() {
    //       it('should return authorisation error', function() {});
    //     });
    //     context('Failure: Open Game', function() {
    //       it('should return invalidOperation error', function() {});
    //     });
    //   });
    //
    //   describe('Delete Game', function() {
    //     context('Success', function() {
    //       it('should acknowledge the subject', function() {});
    //       it('should amend the state', function() {});
    //     });
    //     context('Failure: Unauthenticated', function() {
    //       it('should return authenitcation error', function() {});
    //     });
    //     context('Failure: Unauthorised', function() {
    //       it('should return authorisation error', function() {});
    //     });
    //     context('Failure: Open Game', function() {
    //       it('should return invalidOperation error', function() {});
    //     });
    //   });
    //
    //   describe('Open Game', function() {
    //     context('Success', function() {
    //       it('should acknowledge the subject', function() {});
    //       it('should amend the state', function() {});
    //     });
    //     context('Failure: Unauthenticated', function() {
    //       it('should return authenitcation error', function() {});
    //     });
    //     context('Failure: Unauthorised', function() {
    //       it('should return authorisation error', function() {});
    //     });
    //     context('Failure: Open Game', function() {
    //       it('should return invalidOperation error', function() {});
    //     });
    //   });
    //
    //   describe('Close Game', function() {
    //     context('Success', function() {
    //       it('should acknowledge the subject', function() {});
    //       it('should amend the state', function() {});
    //     });
    //     context('Failure: Unauthenticated', function() {
    //       it('should return authenitcation error', function() {});
    //     });
    //     context('Failure: Unauthorised', function() {
    //       it('should return authorisation error', function() {});
    //     });
    //     context('Failure: No Open Game', function() {
    //       it('should return invalidOperation error', function() {});
    //     });
    //   });
    //
    // });
    //
    // describe('Documents', function() {
    //
    //   context('Publish', function() {
    //     it('should acknowledge the subject', function() {});
    //     it('should notify all observers', function() {});
    //     it('should amend the state', function() {});
    //   });
    //
    // });

  });

});
