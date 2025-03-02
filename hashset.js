import HashMap from "./hashmap";

export default class HashSet {
  constructor(capacity = 16, loadFactor = 0.75) {
    this._map = new HashMap(capacity, loadFactor);
  }

  set(key) {
    this._map.set(key, null);
  }

  get(key) {
    return this._map.get(key);
  }
}
