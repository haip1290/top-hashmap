import LinkedList from "./linkedlist.js";

export default class HashMap {
  constructor(loadFactor = 0.75, capacity = 16) {
    this._validateValue(loadFactor, "Load factor", {
      isNumber: true,
      isPositive: true,
    });

    this._validateValue(capacity, "Capacity", {
      isNumber: true,
      isPositive: true,
      isInteger: true,
    });

    this._loadFactor = loadFactor;
    this._capacity = capacity;
    this._buckets = Array.from({ length: capacity }, () => new LinkedList());
  }

  get capacity() {
    return this._capacity;
  }

  set capacity(capacity) {
    this._validateValue(capacity, "Capacity", {
      isNumber: true,
      isPositive: true,
      isInteger: true,
    });
    this._capacity = capacity;
  }

  get loadFactor() {
    return this._loadFactor;
  }

  set loadFactor(loadFactor) {
    this._validateValue(loadFactor, "Load factor", {
      isNumber: true,
      isPositive: true,
    });
    this._loadFactor = loadFactor;
  }

  get buckets() {
    return this._buckets;
  }

  set buckets(newBuckets) {
    this._validateValue(newBuckets, "Buckets", { isArray: true });
    this._buckets = newBuckets;
  }

  hash(key) {
    let hashcode = 0;
    let primeNumber = 31;
    for (let index = 0; index < key.length; index++) {
      hashcode =
        (primeNumber * hashcode + key.charCodeAt(index)) % this.capacity;
    }
    return hashcode;
  }

  set(key, value) {
    const index = this.hash(key);
    this._buckets[index].insert(key, value);
    if (this.length() > this.capacity * this.loadFactor) {
      this.resize();
    }
  }

  get(key) {
    const index = this.hash(key);
    this._validateIndex(index);
    return this._buckets[index].getValue(key);
  }

  has(key) {
    const index = this.hash(key);
    this._validateIndex(index);
    return this._buckets[index].getValue(key) !== null;
  }

  remove(key) {
    const index = this.hash(key);
    this._validateIndex(index);
    let list = this._buckets[index];
    if (list.getValue(key) === null) {
      return false;
    }
    list.remove(key);
    return true;
  }

  length() {
    let length = 0;
    for (const list of this._buckets) {
      length += list.length;
    }
    return length;
  }

  clear() {
    this._buckets.forEach((list) => (list.head = null));
    this._length = 0;
  }

  keys() {
    let keysList = [];
    this._buckets.forEach((list) => {
      let current = list.head;
      while (current !== null) {
        keysList.push(current.key);
        current = current.next;
      }
    });
    return keysList;
  }

  values() {
    let valueList = [];
    for (const list of this._buckets) {
      if (list.head === null) continue;
      let current = list.head;
      while (current !== null) {
        valueList.push(current.value);
        current = current.next;
      }
    }
    return valueList;
  }

  entries() {
    let entriesList = [];
    for (const list of this._buckets) {
      if (list.head === null) continue;
      let current = list.head;
      while (current !== null) {
        entriesList.push([current.key, current.value]);
        current = current.next;
      }
    }
    return entriesList;
  }

  resize() {
    const newCapacity = this.capacity * 2;
    let newBuckets = Array.from(
      { length: newCapacity },
      () => new LinkedList()
    );
    this.capacity = newCapacity;
    this.buckets.forEach((list) => {
      let current = list.head;
      while (current !== null) {
        const index = this.hash(current.key);
        if (index < 0 || index >= newBuckets.length) {
          throw new Error(
            `Index ${index} is out of bound for bucket length ${newBuckets.length}`
          );
        }
        newBuckets[index].insert(current.key, current.value);
        current = current.next;
      }
    });
    this.buckets = newBuckets;
  }

  _validateIndex(index) {
    if (index < 0 || index >= this._buckets.length) {
      throw new Error(
        `Index ${index} is out of bound for bucket length ${this.buckets.length}`
      );
    }
  }

  // Ensure properties meet specific criteria
  _validateValue(value, propertyName, option = {}) {
    if (option.isNumber === true && typeof value !== "number") {
      throw new Error(
        `${propertyName} must be a number, but got ${typeof value}`
      );
    }
    if (option.isPositive === true && value <= 0) {
      throw new Error(`${propertyName} must be positive, but got ${value}`);
    }
    if (option.isInteger && !Number.isInteger(value)) {
      throw new Error(`${propertyName} must be an integer, but got ${value}`);
    }
    if (option.isArray === true && !Array.isArray(value)) {
      throw new Error(`${propertyName} must be array`);
    }
  }
}
