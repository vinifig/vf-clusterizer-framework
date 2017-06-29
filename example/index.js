const Lib = require('../dist')

let id = Date.now().toString();
let dependencies = [];
let cluster = new Lib.Clusterizer (id, dependencies, function () {
  console.log('oi');
});

console.log(cluster.message)
