export default class Node {
  constructor(key = null, value = null, next = null) {
    this._key = key;
    this._value = value;
    this._next = next;
  }

  get key() {
    return this._key;
  }

  set key(key) {
    this._key = key;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get next() {
    return this._next;
  }

  set next(next) {
    if (next instanceof Node || next === null) {
      this._next = next;
    } else {
      throw new TypeError("next node must be instance of Node or null");
    }
  }
}
