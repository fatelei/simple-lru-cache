// benchmark
'use strict';

const LRUCache = require("../index");

const N = 10000;
const cache = new LRUCache(N);


const benchmark = function (func) {
  let start = process.hrtime();
  let sm = process.memoryUsage();
  func();
  let diff = process.hrtime(start);
  let em = process.memoryUsage();

  let usedMem = em.rss - sm.rss;
  let heapTotal = em.heapTotal - sm.heapTotal;
  let heapUsed = em.heapUsed - sm.heapUsed;

  console.log("Memory Used: " + (usedMem/1024) + "KB");
  console.log("Heap Total: " + (heapTotal/1024) + "KB");
  console.log("Heap Used: " + (heapUsed/1024) + "KB");
  console.log("Time Cost: " + diff[0] + "s\n");
};

benchmark(function () {
  console.log("------set benchmark---------");
  for (let i = 0; i < N; i++) {
    cache.set('test' + i, i);
  }
});

benchmark(function () {
  console.log("------get benchmark----------");
  for (let i = 0; i < N; i++) {
    cache.get('test' + i);
  }
});
