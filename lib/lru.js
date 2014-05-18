/*
 * lru cache
 */

function LRUCache (capacity) {
  this.origin   = capacity;
  this.capacity = capacity || 20;
  this.cache    = {};
  this.link     = [];
  this.timeout  = {};
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
    var index = that.link.indexOf(key);
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
 * set expire time(ms) for key-value
 */
LRUCache.prototype.setex = function (key, expire, value) {
  var that = this;

  if (typeof expire === 'undefined') {
    throw new Error('not set expire time');
  }

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

  var start = parseInt((new Date()).getTime() / 1000);
  that.timeout[key] = {start: start, expire: parseInt(expire / 1000)};
};


/*
 * get key -> cache, then update key's hit and sort the cache sequence
 */
LRUCache.prototype.get = function (key) {
  var that = this;

  if (that.cache.hasOwnProperty(key)) {

    if (that.timeout.hasOwnProperty(key)) {
      var now    = parseInt((new Date()).getTime() / 1000);
      var start  = that.timeout[key].start;
      var expire = that.timeout[key].expire;

      // if the value is not refresh, then clean it
      if ((now - start) > expire) {
        delete that.cache[key];
        that.link.splice(that.link.indexOf(key), 1);
        return null;
      }
    }

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

  that.cache = {};
  that.capacity = that.origin;
  that.link.length = 0;
};
