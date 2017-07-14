import * as io from 'socket.io-client';
import ClusterManager from './cluster/cluster-manager';

/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 *
 *
 * @class Clusterizer
 * @constructor
 * @description Core class for distribute process
 *
 */
class Clusterizer {
  /**
   * @constructor
   *
   * @param config {Object}
   * @param config.id {Any} Clusterized process id(pid)
   * @param config.devices {Device[]} List of Devices to cluster
   * @param [config.totalSize=0] {Integer} Size of data to cluster. If Needed.
   * @param [config.step=1] {Integer} Step of data iteration. If Needed.
   * @param dependencies {Dependency[]} List of Dependencies of type {@link Dependency} from {@link Dependencies} module.
   * @param script {Function}
   **/
  constructor (config, dependencies, script) {
    if (! config) {
      throw new ReferenceError(`Expected 'config' parameter`)
    }

    if (! config.id) {
      throw new ReferenceError(`Expected attribute 'id' of 'config' parameter`)
    }

    if (! config.devices) {
      throw new ReferenceError(`Expected attribute 'devices' of 'config' parameter`)
    }

    if (! dependencies) {
      throw new ReferenceError(`Expected attribute 'devices' of 'config' parameter`)
    }

    if (typeof script != 'function') {
      throw new TypeError(`Expected an 'Function' on script parameter`)
    }

    this._id = config.id;
    this._devices = config.devices;
    this._step = config.step || 1;
    this._totalSize = config.totalSize || 0;
    this._dependencies = dependencies;
    this._script = script;
  }

  /**
   * @member Clusterizer#id {Any} - Getter of Clusterizer id
   **/
  get id () {
    return this._id;
  }


  /**
   * @member Clusterizer#script {String} - Getter of Clusterizer Script String
   **/
  get script () {
    return this._script.toString();
  }

  /**
   * @member Clusterizer#dependencies {Dependency[]} - Getter of Clusterizer {@link Dependency Dependencies} Array.
   **/
  get dependencies () {
    return this._dependencies;
  }

  /**
   * @member Clusterizer#devices {String[]} - Getter of devices;
   **/
  get devices () {
    return this._devices;
  }

  /**
   * @member Clusterizer#message {object} - Getter of Clusterizer Message Object.
   * @property Clusterizer.message.id {any} - Clusterizer ID
   * @property Clusterizer.message.script {String} - Clusterizer Script String
   * @property Clusterizer.message.dependencies {Dependency[]} - Clusterizer Dependencies Array
   **/
  get message () {
    return {
      id: this._id,
      script: this._script.toString(),
      dependencies: this._dependencies,
      totalSize: this._totalSize,
      step: this._step,
    }
  }

  start () {
    let clusterManager = new ClusterManager();
    let message = this.message;
    let devices = this.devices;
    let devicesLength = devices.length || 1;
    let deviceSize = message.totalSize / devicesLength;
    
    message.size = deviceSize;

    for (let i = 0, device = devices[i]; i < devices.length; i++) {
      message.start = i * deviceSize;
      clusterManager.register(device);
    }
    let promise = clusterManager.execute(message);
    return promise;
  }
  /**
   * @method Clusterizer#toString
   * @description To String Clusterizer Method Override
   * @returns {String} Clusterizer Message String
   **/
  toString () {
    return this.message.toString();
  }
}
export default Clusterizer;
