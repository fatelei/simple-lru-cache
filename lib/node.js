/**
 * Linklist node
 */
'use strict';

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

module.exports = Node;
