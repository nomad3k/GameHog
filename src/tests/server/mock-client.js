import uuid from 'uuid/v4';

export default class MockClient {
  constructor(root = true) {
    this.id = uuid();
    this.events = [ ];
    this.handlers = { };
    if (root) {
      this.broadcast = new MockClient(false);
    }
  }
  emit(eventName, args) {
    if (!eventName) throw new Error('Missing argument: eventName')
    this.events.push({ eventName, args });
  }
  on(eventName, handler) {
    this.handlers[eventName] = handler;
  }
  clear() {
    this.events = [ ];
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
  getArgsForSingleEvent(eventName) {
    const events = this.events.filter(x => x.eventName === eventName);
    if (events.length == 0) throw new Error('No matching events found');
    if (events.length >= 2) throw new Error('Multiple matching events found');
    return events[0].args;
  }
}
