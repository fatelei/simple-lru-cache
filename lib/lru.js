/*
 * lru cache
 */

function LRUCache (capacity) {
  this.capacity = capacity || 20;
  this.cache    = {};
  this.link     = [];
}

module.exports = LRUCache;

/*
 * if cache has key, then update the value and update lru queue
 * else cache hasn't key:
 * 1. cache has space for new key, then insert immediately
 * 2. cache hasn't space for new key, then pop the least recently unused key, the insert the new key,value
 */ 
LRUCache.prototype.set = function (key, value) {
  var that = this;

  if (that.cache.hasOwnProperty(key)) {
    // update the value for old key
    that.cache[key] = value;

    // update sequence, because this old key maybe used in future
    var index = that.cache.indexOf(key);
    that.link.splice(index, 1);
    that.link.unshift(key);
  } else {
    if (that.capacity < 0) {
      var eliminate = that.link.pop();
      delete that.cache[eliminate];
    } else {
      that.capacity -= 1;
    }
    that.link.push(key);
    that.cache[key] = value;
  }
};

/*
 * get key -> cache, then update key's hit and sort the cache sequence
 */
LRUCache.prototype.get = function (key) {
  var that = this;

  if (that.cache.hasOwnProperty(key)) {
    var value = that.cache[key];

    // update sequence
    var index = that.link.indexOf(key);
    that.link.splice(index, 1);
    that.link.unshift(key);
    return value;
  } else {
    return null;
  }
};

/*
 * clean cache
 */
LRUCache.prototype.clean = function () {
  var that = this;

  var keys = Object.keys(that.cache);

  for (var i = 0; i < keys.length; i++) {
    delete that.cache[keys[i]];
  }

  that.link.length = 0;
};
