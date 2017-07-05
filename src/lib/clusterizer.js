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
   * @param [config.size=Infinity] {Integer} Size of data to cluster. If Needed.
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
    this._size = config.size || Infinity;
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
   * @member Clusterizer#message {object} - Getter of Clusterizer Message Object.
   * @property Clusterizer.message.id {any} - Clusterizer ID
   * @property Clusterizer.message.script {String} - Clusterizer Script String
   * @property Clusterizer.message.dependencies {Dependency[]} - Clusterizer Dependencies Array
   **/
  get message () {
    return {
      id: this.id,
      script: this.script,
      dependencies: this.dependencies
    }
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
