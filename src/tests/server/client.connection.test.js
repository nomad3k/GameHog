import { expect } from 'chai';

import * as State from '../../shared/store/state';
import { connect } from '../../server/connection';
import * as Events from '../../shared/events';
import MockClient from './mock-client';
import MockStore from './mock-store';

describe('Client:Connection', function() {

  describe('Connect', function() {
    const client = new MockClient();
    const store = new MockStore();
    const connection = connect(store);
    connection(client);

    it('should acknowledge the subject', function() {
      const events = client.events.filter(x => x.eventName === Events.SYSTEM);
      expect(events).to.have.length(1);
    });

    it('should inform observers', function() {
      const args = client.broadcast.getArgsForSingleEvent(Events.CLIENT_CONNECTED);
      expect(args).to.deep.equal({
        id: client.id,
        message: 'Connected'
      });
    });

    it('should amend the state', function() {
      const state = store.getState();
      const player = state.getIn([State.CLIENTS, client.id]);
      expect(player).to.exist;
      expect(player.toJS()).to.deep.equal({ });
    });

  });

  describe('Disconnect', function() {
    const client = new MockClient();
    const store = new MockStore();
    const connection = connect(store);
    connection(client);
    client.clear();
    store.clear();

    before(function() {
      client.trigger(Events.DISCONNECT);
    });

    it('should inform observers', function() {
      const args = client.broadcast.getArgsForSingleEvent(Events.CLIENT_DISCONNECTED);
      expect(args).to.deep.equal({
        id: client.id,
        message: 'Disconnected'
      });
    });

    it('should amend the state', function() {
      const state = store.getState();
      const players = state.get(State.CLIENTS).toJS();
      expect(players).to.deep.equal({ });
    });

  });

});
