/**
 * lru cache
 */
'use strict';

/**
 * Linklist node
 */
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  /**
   * Set privious node info
   * @param {Node} node
   */
  setPrev(node) {
    this.prev = node;
  }

  /**
   * Set next node info
   * @param {Node} node
   */
  setNext(node) {
    this.next = node;
  }

  /**
   * Get previous node
   * @return {Node} previous node
   */
  getPrev() {
    return this.prev;
  }

  /**
   * Get next node
   * @return {Node} next node
   */
  getNext() {
    return this.next;
  }
}

/**
 * Double linklist
 */
class DoubleLinkList {
  constructor(size) {
    this.size = size;
    this.currSize = 0;
    this._head = null;
    this._tail = null;
  }

  /**
   * Add node to double link list.
   * @return {Node}
   */
  addNodeToList(key, value) {
    let node = new Node(key, value);
    if (this._head === null || this.size === 1) {
      this._head = node;
      this._tail = node;
      this.currSize = 1;
      return node;
    } else if (this.currSize < this.size) {
      this.currSize += 1;
    } else {
      this._tail = this._tail.getPrev();
      if (this._tail) {
        this._tail.setNext(null);
      }
    }

    this._tail.setNext(node);
    node.setPrev(this._tail);
    this._tail = node;
    return node;
  }

  /**
   * Move node to link list head
   * @param  {Node} node [description]
   */
  movePageToHead(node) {
    if (!node || node === this._head) {
      return;
    }

    if (node === this._tail) {
      this._tail = this._tail.getPrev();
      this._tail.setNext(null);
    }

    let prev = node.getPrev();
    let next = node.getNext();
    prev.setNext(next);

    if (next != null) {
      next.setPrev(prev);
    }

    node.setPrev(null);
    node.setNext(this._head);
    this._head.setPrev(node);
    this._head = node;
  }

  /**
   * Get link list head.
   * @return {Node} [description]
   */
  getHead() {
    return this._head;
  }

  /**
   * Get link list tail.
   * @return {Node} [description]
   */
  getTail() {
    return this._tail;
  }
}

class LRUCache {
  /**
   * Initialize a LRUCache instance.
   * @param  {Number} size Cache size
   * @return {Object}      A instance of LRUCache
   */
  constructor(size) {
    this.size = size || 10;
    this.cache = new Map();  // Used to store <k, v>
    this.doubleLinkList = new DoubleLinkList(size);
  }

  /**
   * Elimination the code as LRU algorithm.
   */
  eliminate() {
    if (this.doubleLinkList.currSize === this.doubleLinkList.size) {
      // Elimination the tail node.
      let tmpNode = this.doubleLinkList.getTail();
      this.cache.delete(tmpNode.key);
    }
  }

  /**
   * Get cache size.
   * @return {Number} [description]
   */
  getSize() {
    return this.cache.size;
  }

  /**
   * Set <k, v> to cache
   * @param {String} key
   * @param {Any} value
   */
  set(key, value) {
    if (this.cache.has(key)) {
      let node = this.cache.get(key);
      node.value = value;
      this.cache.set(key, node);
      this.doubleLinkList.movePageToHead(node);
    } else {
      // Check whether current size is equal to total size or not.
      this.eliminate();
      let newNode = this.doubleLinkList.addNodeToList(key, value);
      this.cache.set(key, newNode);
    }
  }

  /**
   * Set expire time for <k, v>
   * @param  {String} key
   * @param  {Any} value
   * @param  {[Number]} expire
   */
  setex(key, value, expire) {
    expire = parseInt(expire, 10);

    if (isNaN(expire)) {
      throw new Error('expire should be number');
    }

    this.set(key, value);
    setTimeout(() => {
      this.cache.delete(key);
    }, expire);
  }

  /**
   * Get value from cache via key.
   * @param {String} key
   * @return A value or undefined.
   */
  get(key) {
    let node = this.cache.get(key);
    return node ? node.value : undefined;
  }

  /**
   * Like redis rpush command.
   * @param {String} key
   * @param {Any} value
   */
  rpush(key, value) {
    if (this.cache.has(key)) {
      let node = this.cache.get(key);
      node.value.push(value);
      this.cache.set(key, node);
      this.doubleLinkList.movePageToHead(node);
    } else {
      // Check whether current size is equal to total size or not.
      this.eliminate();
      let newNode = this.doubleLinkList.addNodeToList(key, [value]);
      this.cache.set(key, newNode);
    }
  }

  /**
   * Set expire time for key.
   * @param  {String} key    [description]
   * @param  {Number} expire [description]
   */
  expire(key, expire) {
    expire = parseInt(expire, 10);

    if (isNaN(expire)) {
      throw new Error('expire should be number');
    }

    if (this.cache.has(key)) {
      setTimeout(() => {
        this.cache.delete(key);
      }, expire)
    }
  }
}

module.exports = LRUCache;
