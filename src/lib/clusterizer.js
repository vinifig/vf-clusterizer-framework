import * as io from 'socket.io-client';
import ClusterManager from './cluster/cluster-manager';
import ClusterizerConfig from './model/clusterizer-config';

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
  constructor (config, dependencies, script, before, after) {
    let clusterizerConfig = new ClusterizerConfig(config, dependencies, script, before, after)

    this._id = clusterizerConfig.id;
    this._devices = clusterizerConfig.devices;
    this._step = clusterizerConfig.step;
    this._totalSize = clusterizerConfig.totalSize;
    this._dependencies = clusterizerConfig.dependencies;
    this._script = clusterizerConfig.script;
    this._before = clusterizerConfig.before;
    this._after = clusterizerConfig.after;
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
   * @member Clusterizer#before {String} - Getter of Clusterizer Script String
   **/

  get before () {
    if (this._before) {
      return this._before.toString();
    }
    return undefined;
  }

  /**
   * @member Clusterizer#after {String} - Getter of Clusterizer Script String
   **/
  get after () {
    if (this._after) {
      return this._after.toString();
    }
    return undefined;
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
  getMessage (size, start) {
    return {
      id: this.id,
      script: this.script,
      before: this.before,
      after: this.after,
      dependencies: this.dependencies,
      totalSize: this._totalSize,
      step: this._step,
      size,
      start
    }
  }

  start () {
    let clusterManager = new ClusterManager();
    let devices = this.devices;
    let devicesLength = devices.length || 1;
    let deviceSize = this._totalSize / devicesLength;

    for (let i = 0, device = devices[i]; i < devices.length; i++) {
      let message = this.getMessage(deviceSize, i * deviceSize);
      clusterManager.register(device, message);
    }
    let promise = clusterManager.execute();
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
