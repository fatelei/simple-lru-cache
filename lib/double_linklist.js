/**
 * Double linklist
 */
'use strict';

const Node = require('./node');


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

module.exports = DoubleLinkList;
