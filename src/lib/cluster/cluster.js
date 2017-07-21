/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 */
const io = require('socket.io-client');

class Cluster {
  
  constructor (path, message) {
    this.path = path;
    this.socket = io(path);
    this.message = message;
    this.promise = Promise.defer();
  }

  send () {
    this.socket.emit('start-process', this.message);
  }

  disconnect () {
    return this.socket.disconnect(true);
  }


  response (data) {
    this.disconnect();

    data.device = this.path;

    if (data.error) {
      return this.promise.reject(data)
    }

    return this.promise.resolve(data);
  }

  watch (key) {
    this.socket.on(`response-${this.message.id}`, this.response.bind(this));
  }

  execute () {
    this.watch();
    this.send();
    return this.promise;
  }

}
export default Cluster;
