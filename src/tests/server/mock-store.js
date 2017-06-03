import createStore from '../../shared/store/store';

export default class MockStore {
  constructor() {
    this.events = [ ];
    this.store = createStore();
  }

  dispatch(event) {
    this.events.push(event);
    this.store.dispatch(event);
  }

  getState() {
    return this.store.getState();
  }

  clear() {
    this.events = [ ];
  }
}
