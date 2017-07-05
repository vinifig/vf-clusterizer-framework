const Lib = require('../dist')
const Clusterizer = Lib.Clusterizer;
const IO = Lib.Dependencies.IO;

let id = Date.now().toString();
let devices = []
let config = {
  id,
  devices
}

let dependencies = [IO];

let script = function (info, IO) {
  console.log('oi');
}


let cluster = new Clusterizer (config, dependencies, script);

io = new IO();
io.textContent += JSON.stringify(cluster.message);
