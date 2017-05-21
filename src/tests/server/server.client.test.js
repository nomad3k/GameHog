import { expect } from 'chai';
import uuid from 'uuid/v4';

import * as Types from '../../server/store/types';
import { connect } from '../../server/client';
import * as Events from '../../shared/events';

describe('Server-side Client Handlers', function() {

  function MockStore() {
    this.actions = [];
  }
  MockStore.prototype.dispatch = function(action) {
    this.actions.push(action);
  }

  function MockClient() {
    this.id = uuid();
    this.events = [ ];
    this.handlers = { };
  }
  MockClient.prototype.emit = function(event, message) {
    this.events.push({ event, message });
  }
  MockClient.prototype.on = function(event, handler) {
    this.handlers[event] = handler;
  }
  MockClient.prototype.clear = function() {
    this.events = [ ];
  }


  let store;
  let handler;
  let subject;

  beforeEach(function() {
    store = new MockStore();
    subject = new MockClient();
    subject.broadcast = new MockClient();
    handler = connect(store);
    handler(subject);
  });

  describe('Connecting', function() {
    it('attaches the handlers', function() {
      expect(subject.handlers['disconnect']).to.not.be.undefined;
      expect(subject.handlers[Events.ECHO]).to.not.be.undefined;
      expect(subject.handlers[Events.SUBSCRIBE]).to.not.be.undefined;
      expect(subject.handlers[Events.UNSUBSCRIBE]).to.not.be.undefined;
      expect(subject.handlers[Events.REPLAY]).to.not.be.undefined;
    });

    it('informed client(s)', function() {
      const e = {
        event: Events.CLIENT_CONNECTED,
        message: {
          id: subject.id,
          message: 'Connected'
        }
      };
      expect(subject.events).to.deep.equal([e]);
      expect(subject.broadcast.events).to.deep.equal([e]);
    });

    it('mutated state', function() {
      const actual = store.actions.map(({ client, type }) => ({ client, type }));
      expect(actual).to.deep.equal([{
        type: Types.CLIENT_CONNECTED,
        client: subject.id
      }]);
    });
  });

  describe('Connected', function() {
    beforeEach(function() {
      subject.clear();
      subject.broadcast.clear();
    });

    describe('Disconnect', function() {

      it('informed client(s)', function() {
        subject.handlers['disconnect']();

        const expected = {
          event: Events.CLIENT_DISCONNECTED,
          message: {
            id: subject.id,
            message: 'Disconnected'
          }
        };
        expect(subject.events).to.have.length(0);
        expect(subject.broadcast.events).to.deep.equal([expected]);
      });
    });
  });

});
