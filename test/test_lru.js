/*
 * test lru cache
 */

// core module
var assert = require("assert");

// own module
var LRUCache = require("../index");

describe("lru cache test", function () {
  var cache;
  before(function () {
    cache = new LRUCache(5);
  });

  describe("test set key, value & get key", function () {
    it("should set value successfully", function () {
      cache.clean();
      cache.set("test", "hello world");
      assert.deepEqual("hello world", cache.get("test"));
    });
  });

  describe("test get null value", function () {
    it("should get null value", function () {
      cache.clean();
      assert.deepEqual(null, cache.get("foo"));
    });
  });

  describe("test lru algthorim", function () {
    it("should be work", function () {
      cache.clean();
      var key = "test_";
      var value = "hello world ";
      for (var i = 0; i < 5; i++) {
        cache.set(key + i, value + i);
      }

      cache.get("test_0");
      cache.get("test_4");
      cache.set("test_5", "hello world 5");

      assert.deepEqual(null, cache.get("test_3"));
    });
  });
});