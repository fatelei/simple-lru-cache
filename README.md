Memory storage
==============

a simple memory storage using lru algthorim

## Install

```
npm install memory-storage
```

## Usage
```
var MemoryStorage = require('memory-storage');
var storage = new MemoryStorage(); // You can specific storage size, new MemoryStorage(100), default is 1000.

storage.set('foo', 'bar');
console.log(storage.get('foot'));
```

## test
	make test

## benchmark
	node benchmark/benchmark.js

## APIs

### set(key, value)
Insert key/value pair to memory

### setex(key, expire, value)
Insert key/value pair to memory, it will be expired in expire(ms)

### reset
Reset storage

### get(key) -> value
Get value from storage by specific key.