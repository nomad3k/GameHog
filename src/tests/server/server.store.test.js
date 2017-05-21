import { expect } from 'chai';
import * as Types from '../../server/store/types';
import * as Actions from '../../server/store/actions';
import createStore from '../../server/store/store';

describe('Server Store', function() {

  it('should have initialState', function() {
    const store = createStore();
    const expected = { clients: { }, topics: { } };

    expect(store.getState().toJS()).to.deep.equal(expected);
  });

  describe('Client', function() {

    // ---------------------------------------------------------------------------
    // CONNECT
    // ---------------------------------------------------------------------------

    describe('Connect', function() {

      it('should build action', function() {
        const action = Actions.clientConnected({ client: 'foo' });

        const expected = {
          type: Types.CLIENT_CONNECTED,
          client: 'foo',
          socket: undefined
        };
        expect(action.type).to.not.be.undefined;
        expect(action).to.deep.equal(expected);
      });

      it('allow single connection', function() {
        const store = createStore();

        store.dispatch(Actions.clientConnected({ client: 'bah' }));

        const expected = {
          clients: {
            bah: {
              socket: undefined,
              subscriptions: [ ]
            }
          },
          topics: { }
        };
        expect(store.getState().toJS()).to.deep.equal(expected);
      });

      it('should allow multiple connections', function() {
        const store = createStore();

        store.dispatch(Actions.clientConnected({ client: 'foo' }));
        store.dispatch(Actions.clientConnected({ client: 'bah' }));

        const expected = {
          clients: {
            bah: { socket: undefined, subscriptions: [ ] },
            foo: { socket: undefined, subscriptions: [ ] }
          },
          topics: { }
        };
        expect(store.getState().toJS()).to.deep.equal(expected);
      });

    });

    // ---------------------------------------------------------------------------
    // DISCONNECT
    // ---------------------------------------------------------------------------

    describe('Disconnect', function() {

      it('should build action', function() {
        const action = Actions.clientDisconnected({ client: 'meep' });
        const expected = {
          type: Types.CLIENT_DISCONNECTED,
          client: 'meep'
        };
        expect(action.type).to.not.be.undefined;
        expect(action).to.deep.equal(expected)
      })

      it('should disconnect client', function() {
        const store = createStore();
        [
          Actions.clientConnected({ client: 'foo' }),
          Actions.clientConnected({ client: 'bah' }),
          Actions.clientConnected({ client: 'meep' })
        ].forEach(store.dispatch);

        store.dispatch(Actions.clientDisconnected({ client: 'bah' }));

        const expected = {
          clients: {
            foo: {
              socket: undefined,
              subscriptions: [ ]
            },
            meep: {
              socket: undefined,
              subscriptions: [ ]
            }
          },
          topics: { }
        };
        expect(store.getState().toJS()).to.deep.equal(expected);
      });

      it('should unsubscribe from topics', function() {
        const store = createStore();
        [
          Actions.topicOpened({ topic: 'x' }),
          Actions.topicOpened({ topic: 'y' }),
          Actions.topicOpened({ topic: 'z' }),
          Actions.clientConnected({ client: 'foo' }),
          Actions.topicSubscribed({ client: 'foo', topic: 'x' }),
          Actions.topicSubscribed({ client: 'foo', topic: 'y' }),
          Actions.topicSubscribed({ client: 'foo', topic: 'z' }),
          Actions.clientConnected({ client: 'bah' }),
          Actions.topicSubscribed({ client: 'bah', topic: 'x' }),
          Actions.topicSubscribed({ client: 'bah', topic: 'y' }),
          Actions.topicSubscribed({ client: 'bah', topic: 'z' })
        ].forEach(store.dispatch);

        store.dispatch(Actions.clientDisconnected({ client: 'foo' }));

        const expected = {
          clients: {
            bah: {
              socket: undefined,
              subscriptions: [ 'x', 'y', 'z' ]
            }
          },
          topics: {
            'x': { subscribers: ['bah'] },
            'y': { subscribers: ['bah'] },
            'z': { subscribers: ['bah'] }
          }
        };
        expect(store.getState().toJS()).to.deep.equal(expected);
      });
    });

  });

  // ---------------------------------------------------------------------------
  // Topic
  // ---------------------------------------------------------------------------

  describe('Topic', function() {

    // ---------------------------------------------------------------------------
    // Topic Open
    // ---------------------------------------------------------------------------

    describe('Open', function() {

      it('should build action', function() {
        const action = Actions.topicOpened({ topic: 'xxx' });
        const expected = {
          type: Types.TOPIC_OPEN,
          topic: 'xxx'
        };
        expect(action.type).to.not.be.undefined;
        expect(action).to.deep.equal(expected);
      });

      it('should create topic', function() {
        const store = createStore();

        store.dispatch(Actions.topicOpened({ topic: 'yyy' }));

        const expected = {
          clients: { },
          topics: {
            yyy: { subscribers: [ ] }
          }
        };
        expect(store.getState().toJS()).to.deep.equal(expected);
      });
    });

    // ---------------------------------------------------------------------------
    // Topic Open
    // ---------------------------------------------------------------------------

    describe('Close', function() {

      it('should build action', function() {
        const action = Actions.topicClosed({ topic: 'yyy' });
        const expected = {
          type: Types.TOPIC_CLOSE,
          topic: 'yyy'
        };
        expect(action.type).to.not.be.undefined;
        expect(action).to.deep.equal(expected);
      });

      it('should remove open topic', function() {
        const store = createStore();
        store.dispatch(Actions.topicOpened({ topic: 'aaa' }));

        const expected = {
          clients: { },
          topics: {
            aaa: { subscribers: [] }
          }
        };
        expect(store.getState().toJS()).to.deep.equal(expected);
      });

      it('should remove subscriptions', function() {
        const store = createStore();
        [
          Actions.topicOpened({ topic: 'x' }),
          Actions.topicOpened({ topic: 'y' }),
          Actions.topicOpened({ topic: 'z' }),
          Actions.clientConnected({ client: 'foo' }),
          Actions.topicSubscribed({ topic: 'x', client: 'foo' }),
          Actions.topicSubscribed({ topic: 'y', client: 'foo' }),
          Actions.topicSubscribed({ topic: 'z', client: 'foo' })
        ].forEach(store.dispatch);

        store.dispatch(Actions.topicClosed({ topic: 'y' }));

        const expected = {
          clients: {
            'foo': {
              socket: undefined,
              subscriptions: [ 'x', 'z' ]
            }
          },
          topics: {
            x: { subscribers: ['foo'] },
            z: { subscribers: ['foo'] }
          }
        };
        expect(store.getState().toJS()).to.deep.equal(expected);
      });
    });

    // ---------------------------------------------------------------------------
    // SUBSCRIBE
    // ---------------------------------------------------------------------------

    describe('Subscribe', function() {
      it('should create action', function() {
        const action = Actions.topicSubscribed({ topic: 'foo', client: 'bah' });
        const expected = {
          type: Types.TOPIC_SUBSCRIBE,
          topic: 'foo',
          client: 'bah'
        };
        expect(action).to.deep.equal(expected);
      });

      it('should mutate state', function() {
        const store = createStore();
        [
          Actions.clientConnected({ client: 'xxx' }),
          Actions.topicOpened({ topic: 'aaa' })
        ].forEach(store.dispatch);

        store.dispatch(Actions.topicSubscribed({ client: 'xxx', topic: 'aaa' }));

        const expected = {
          clients: {
            'xxx': {
              socket: undefined,
              subscriptions: ['aaa']
            }
          },
          topics: {
            'aaa': { subscribers: ['xxx'] }
          }
        };
        expect(store.getState().toJS()).to.deep.equal(expected);
      });
    });

    // ---------------------------------------------------------------------------
    // UNSUBSCRIBE
    // ---------------------------------------------------------------------------

    describe('Unsubscribe', function() {
      it('should create action', function() {
        const action = Actions.topicUnsubscribed({ topic: 'bah', client: 'foo' });
        const expected = {
          type: Types.TOPIC_UNSUBSCRIBE,
          topic: 'bah',
          client: 'foo'
        };
        expect(action).to.deep.equal(expected);
      });
    });

  });
});
