/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 */
const io = require('socket.io-client');

class Cluster {
  constructor (path) {
    this.socket = io(path);
    this.promise = Promise.defer();
  }

  send (message) {
    this.socket.emit('start-process', message);
  }

  watch (key) {
    this.socket.on(`response-${key}`, (data) => {
      if (data.error) {
        return this.promise.reject(data)
      }
      return this.promise.resolve(data);
    })
  }

  execute (message) {
    this.watch(message.id);
    this.send(message);
    return this.promise;
  }
}
export default Cluster;
