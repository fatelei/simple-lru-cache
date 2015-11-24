/**
 * lru cache
 */
'use strict';

const DoubleLinkList = require('./double_linklist');


class LRUCache {
  /**
   * Initialize a LRUCache instance.
   * @param  {Number} size Cache size
   * @return {Object}      A instance of LRUCache
   */
  constructor(size) {
    this.size = size || 10;
    this.cache = new Map();  // Used to store <k, v>
    this.timer = new Map();
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
    if (node) {
      this.doubleLinkList.movePageToHead(node);
      return node.value;
    }
    return undefined;
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
   * Like redis rpop command
   * @param  {String} key [description]
   * @return {Any}     [description]
   */
  rpop(key) {
    let node = this.cache.get(key);
    if (node) {
      if (Array.isArray(node.value)) {
        let rst = node.value.pop();
        this.doubleLinkList.movePageToHead(node);
        return rst;
      }
      throw new Error('Invalid type, value must be an array');
    }
    return null;
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
      let currTimer = this.timer.get(key);
      if (currTimer) {
        clearTimeout(currTimer);
      }
      this.timer[key] = setTimeout(() => {
        this.cache.delete(key);
        this.timer.delete(key);
      }, expire);
    }
  }
}

module.exports = LRUCache;
