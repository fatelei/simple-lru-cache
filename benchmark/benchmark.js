// benchmark

var LRUCache = require("../index");

var N = 10000;
var cache = new LRUCache(N);


var benchmark = function (func) {
  var start = process.hrtime();
  var sm = process.memoryUsage();
  func();
  var diff = process.hrtime(start);
  var em = process.memoryUsage();

  var usedMem = em.rss - sm.rss;
  var heapTotal = em.heapTotal - sm.heapTotal;
  var heapUsed = em.heapUsed - sm.heapUsed;

  console.log("Memory Used: " + (usedMem/1024) + "KB");
  console.log("Heap Total: " + (heapTotal/1024) + "KB");
  console.log("Heap Used: " + (heapUsed/1024) + "KB");
  console.log("Time Cost: " + diff[0] + "s\n");
};

benchmark(function () {
  console.log("------set benchmark---------");
  for (var i = 0; i < N; i++) {
    cache.set('test' + i, i);
  }
});

benchmark(function () {
  console.log("------get benchmark----------");
  for (var i = 0; i < N; i++) {
    cache.get('test' + i);
  }
});

benchmark(function () {
  console.log("------clean benchmark----------");
  cache.clean();
});

