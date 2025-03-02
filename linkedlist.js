import Node from "./node.js";

export default class LinkedList {
  constructor(head = null) {
    this._head = head;
    this._length = 0;
  }

  get head() {
    return this._head;
  }

  set head(head) {
    if (head instanceof Node || head === null) {
      this._head = head;
    } else {
      throw new TypeError("head must be instance of Node or null");
    }
  }

  get length() {
    return this._length;
  }

  prepend(key, value) {
    let newNode = new Node(key, value);
    if (this.head === null) {
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this._length++;
  }

  insert(key, value) {
    let current = this.head;
    while (current !== null) {
      if (current.key === key) {
        current.value = value;
        return;
      }
      current = current.next;
    }
    this.prepend(key, value);
  }

  getValue(key) {
    let current = this.head;
    while (current !== null) {
      if (current.key === key) {
        return current.value;
      }
      current = current.next;
    }
    return null;
  }

  remove(key) {
    if (this.head === null) {
      return false;
    }

    if (this.head.key === key) {
      this.head = this.head.next;
      this._length--;
      return true;
    }

    let current = this.head;
    while (current.next != null) {
      if (current.next.key === key) {
        current.next = current.next.next;
        this._length--;
        return true;
      }
      current = current.next;
    }
    return false;
  }

  toString() {
    let result = "";
    let current = this.head;
    while (current != null) {
      result += `(${current.data}) -> `;
      current = current.nextNode;
    }
    result += "null";
    return result;
  }
}
