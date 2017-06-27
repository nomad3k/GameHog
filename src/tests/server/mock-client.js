import uuid from 'uuid/v4';

export default class MockClient {

  constructor(root = true) {
    this.id = uuid();
    this.events = { };
    this.handlers = { };
    this.rooms = { };
    if (root) {
      this.broadcast = new MockClient(false);
    }
  }

  join(room) {
    this.rooms[room] = true;
  }

  leave(room) {
    this.rooms[room] = false;
  }

  to(room) {
    return {
      emit: (eventName, args) => {
        this.emit(eventName, args, room)
      }
    };
  }

  emit(eventName, args, room = '#default') {
    if (!eventName) throw new Error('Missing argument: eventName');
    if (this.events[room]) {
      this.events[room].push({ eventName, args });
    } else {
      this.events[room] = [ { eventName, args } ];
    }
  }

  on(eventName, handler) {
    this.handlers[eventName] = handler;
  }

  clear() {
    this.events = { };
    if (this.broadcast) {
      this.broadcast.clear();
    }
  }

  trigger(eventName, args, callback) {
    const handler = this.handlers[eventName];
    if (!handler) {
      throw new Error(`Unknown Handler: ${eventName}`);
    }
    handler(args, callback);
  }

  getArgsForSingleEvent(eventName, room = '#default') {
    const roomEvents = this.events[room];
    if (!roomEvents) return null;
    const events = roomEvents.filter(x => x.eventName === eventName);
    if (events.length == 0) throw new Error('No matching events found');
    if (events.length >= 2) throw new Error('Multiple matching events found');
    return events[0].args;
  }
}
