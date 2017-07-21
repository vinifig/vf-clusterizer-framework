const Lib = require('../dist')
const Clusterizer = Lib.Clusterizer;

let id = Date.now().toString();
let devices = ['http://localhost:8080'];
let config = {
  id,
  devices,
  totalSize: 50,
  step: 1
}

let dependencies = ['IO'];

let script = function (info, IO) {
  var milliseconds = parseInt(Date.now().toString());
  if(milliseconds % 2){
    throw new Error('milliseconds é par')
  }
  return 'executado';
}

let processaResultados = function (resultados) {
  resultados.forEach((resultado) => {
    console.dir(resultado);
    console.log(`Numero de Sucessos: ${resultado.response._content.success.length}`);
    console.log(`Numero de Falhas: ${resultado.response._content.failure.length}`);
  })
}

let listaFalhas = function(falhas) {
  console.dir(falhas);
}

let clusterized = new Clusterizer (config, dependencies, script);


clusterized.start()
           .then(processaResultados)
           .catch(listaFalhas);
