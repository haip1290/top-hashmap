import HashMap from "./hashmap.js";

const test = new HashMap();

test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");

console.log("hashmap", test.entries());
console.log("capacity", test.capacity);
console.log("load factor", test.loadFactor);
console.log("size", test.length());

test.set("apple", "crimson");
test.set("ice cream", "chocolate");

console.log("hashmap", test.entries());
console.log("size", test.length());
console.log("capacity", test.capacity);

test.set("moon", "silver");
console.log("hashmap", test.entries());
console.log("size", test.length());
console.log("capacity", test.capacity);

test.set("moon", "none");
test.set("lion", "white");
console.log("hashmap", test.entries());
console.log("size", test.length());
console.log("capacity", test.capacity);

let key = "dog";
console.log("key", key, "value", test.has(key)); // true
console.log("key", key, "value", test.get(key)); // brown

key = "abc";
console.log("key", key, "value", test.has(key)); // false
console.log("key", key, "value", test.get(key)); // null

key = "abc";
console.log("key", key, "remove", test.remove(key)); // false

key = "moon";
console.log("key", key, "remove", test.remove(key)); // true
console.log("hashmap", test.entries());

console.log("keys", test.keys());
console.log("values", test.values());

test.clear();
console.log("hashmap", test.entries());

console.log("keys", test.keys());
console.log("values", test.values());
