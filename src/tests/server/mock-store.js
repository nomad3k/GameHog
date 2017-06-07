import createStore from '../../server/store/store';

export default class MockStore {
  constructor() {
    this.events = [ ];
    this.store = createStore();
    console.log(this.store.getState());
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
