Memory storage
==============

![Build Status](https://travis-ci.org/fatelei/simple-lru-cache.svg)

A simple memory storage based [LRU](https://en.wikipedia.org/wiki/Cache_algorithms) algthorim.

## Install

```
npm install memory-storage
```

## APIs

### LRUCache

Intialize a `LRUCache` instance.

+ size {Number}: cache size, default is 10

#### Usage

```
const LRUCache = require('memory-storage');
const cache = new LRUCache();
```

or

```
const LRUCache = require('memory-storage');
const cache = new LRUCache(100);
```

### set

Set <k, v> to cache.

+ key {String}: key name
+ value {Any}: To be cached value

#### Usage

```
cache.set('a', 1);  // Set number
cache.set('a', {}); // Set object
cache.set('a', []); // Set array
cache.set('a', 'a'); // Set string
```

### setex

Set <k, v> to cache and add expire time(seconds).

+ key {String}: key name
+ value {Any}: to be cached value
+ expire {Number}: expire seconds

#### Usage

```
cache.set('a', 1, 100);
```

### expire

Expire key in seconds

+ key {String}: key name
+ expire {Number}: expire seconds

#### Usage

```
cache.expire('a', 100);
```

### get

Get value by key, return real value or undefined.

+ key {String}: key name

#### Usage

```
cache.get('foo');
```

### rpush

Push `value` to named `key`'s array.

+ key {String}: key name
+ value {Any}: To be cached value

#### Usage

```
cache.rpush('a', 'a');
```

### rpop

Pop `value` from named `key`'s array and return it.

+ key {String}: key name

#### Usage

```
cache.rpush('a', 1);
console.log(cache.rpop('a'));
```

## Test

```
jasmine
```

## TODO

+ support more apis like redis command.
