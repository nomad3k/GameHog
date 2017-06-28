import { expect } from 'chai';

import * as Rooms from '../../server/rooms';
import * as State from '../../shared/store/state';
import { connect } from '../../server/controller';
import * as passwords from '../../server/passwords';
import * as Events from '../../shared/events';
import MockClient from './mock-client';
import MockStore from './mock-store';

describe('Client:Connection', function() {

  describe('Connect', function() {
    const client = new MockClient();
    const store = new MockStore();
    const connection = connect(store, passwords);
    connection(client, client);

    it('should acknowledge the subject', function() {
      const event = client.getArgsForSingleEvent(Events.SYSTEM);
      expect(event).to.exist;
    });

    it('should inform observers', function() {
      const args = client.getArgsForSingleEvent(Events.CLIENT_CONNECTED, Rooms.CONNECTED);
      expect(args).to.deep.equal({
        id: client.id,
        message: 'Connected'
      });
    });

    it('should amend the state', function() {
      const state = store.getState().shared;
      const player = state.getIn([State.CLIENTS, client.id]);
      expect(player).to.exist;
      expect(player.toJS()).to.deep.equal({ });
    });

  });

  describe('Disconnect', function() {
    const client = new MockClient();
    const store = new MockStore();
    const connection = connect(store, passwords);
    connection(client, client);
    client.clear();
    store.clear();

    before(function() {
      client.trigger(Events.DISCONNECT);
    });

    it('should inform observers', function() {
      const args = client.getArgsForSingleEvent(Events.CLIENT_DISCONNECTED, Rooms.CONNECTED);
      expect(args).to.deep.equal({
        id: client.id,
        message: 'Disconnected'
      });
    });

    it('should amend the state', function() {
      const state = store.getState().shared;
      const players = state.get(State.CLIENTS).toJS();
      expect(players).to.deep.equal({ });
    });

  });

});
