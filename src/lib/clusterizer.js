/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 */
export default class Clusterizer {
  /**
   * @name constructor
   *
   * @param config {Object}
   *   @required
   *   @type {Object}
   *
   *    @attribute id
   *      @required
   *      @description Clusterized process id
   *
   *    @attribute devices
   *      @required
   *      @description List of Devices to cluster
   *
   *    @attribute size
   *      @description Size of data to cluster. If needed
   *      @default Infinity
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

    this._id = config.id;
    this._devices = config.devices;
    this._size = config.size || Infinity;
    this._dependencies = dependencies;
    this._script = script;
  }

  get id () {
    return this._id;
  }

  get script () {
    return this._script.toString();
  }

  get dependencies () {
    return this._dependencies;
  }

  get message () {
    return {
      id: this.id,
      script: this.script,
      dependencies: this.dependencies
    }
  }

  toString () {
    return this.message;
  }
}
