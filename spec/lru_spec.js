/**
 * Test.
 */
'use strict';

const LRUCache = require('../index');

describe('Test LRUCache', function () {
  describe('Test initialize without parameter', function () {
    it('should pass', function () {
      let cache = new LRUCache();
      expect((cache instanceof LRUCache)).toBe(true);
    });
  });

  describe('Test initialize with parameter', function () {
    it('should pass', function () {
      let cache = new LRUCache(100);
      expect((cache instanceof LRUCache)).toBe(true);
    });
  });

  describe('Test call set method', function () {
    it('should pass', function () {
      let cache = new LRUCache(100);
      cache.set('a', 'b');
      expect(cache.getSize()).toBe(1);
    });
  });

  describe('Test call get method', function () {
    it('should pass', function () {
      let cache = new LRUCache(100);
      cache.set('a', 'b');
      expect(cache.get('a')).toBe('b');
    });
  });

  describe('Test call eliminate', function () {
    describe('trigger eliminate', function () {
      it('should pass', function () {
        let cache = new LRUCache(1);
        cache.set('a', 'b');
        cache.set('b', 'c');
        expect(cache.get('a')).toBe(undefined);
      });
    });
    
    describe('not trigger eliminate', function () {
      it('should pass', function () {
        let cache = new LRUCache(1);
        cache.set('a', 'b');
        cache.set('a', 'e');
        expect(cache.get('a')).toBe('e');
      });
    });
  });

  describe('Test call lpush method', function () {
    it('should pass', function () {
      let cache = new LRUCache(100);
      cache.rpush('a', 'b');
      expect(cache.get('a').length).toBe(1);
      cache.rpush('a', 'c');
      expect(cache.get('a').length).toBe(2);
    });
  });

  describe('Test call setex method', function () {
    describe('pass `expire` not a number', function () {
      it('should occur error', function () {
        let cache = new LRUCache(100);
        const foo = () => {
          cache.setex('a', 'b');
        };

        expect(foo).toThrow();
      });
    });

    describe('pass right expire', function () {
      it('should pass', function (done) {
        let cache = new LRUCache(100);
        cache.setex('a', 'b', 100);
        setTimeout(() => {
          expect(cache.get('a')).toBe(undefined);
          done();
        }, 1000);
      });
    });
  });
});