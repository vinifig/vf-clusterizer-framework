const Lib = require('../dist')
const Clusterizer = Lib.Clusterizer;

let id = Date.now().toString();
let devices = ['http://localhost:8080'];
let config = {
  id,
  devices,
  totalSize: 1,
  step: 1
}

let dependencies = ['IO'];

let script = function (info, IO) {
  return 'executado';
}


let clusterized = new Clusterizer (config, dependencies, script);

clusterized.start()
           .then(function (result) {
             result.forEach(console.dir.bind())
           })
           .catch(function (fail) {
             console.dir(fail)
           });
