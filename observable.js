export class Observable {
  constructor() {
    this.callbacks = [];
  }
  observe(callback) {
    this.callbacks.push(callback);
    callback(this);
  }
  unobserve(callback) {
    this.callbacks = this.callbacks.filter(
      (registeredCallback) => registeredCallback !== callback
    );
  }
  dispatch() {
    for (let callback of this.callbacks) {
      callback(this);
    }
  }
}
