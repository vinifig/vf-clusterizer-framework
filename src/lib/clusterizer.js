/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 *
 *
 * @name Clusterizer
 *   @description Core class for distribute process
 *
 */
export default class Clusterizer {
  /**
   * @name constructor
   *
   *
   *
   * @param config
   *   @required
   *   @type {Object}
   *
   *    @attribute id
   *      @required
   *      @type {Any}
   *      @description Clusterized process id
   *
   *    @attribute devices
   *      @type {Device[]}
   *      @required
   *      @description List of Devices to cluster
   *
   *    @attribute size
   *      @type {Integer}
   *      @description Size of data to cluster. If needed
   *      @default Infinity
   *
   *    @attribute step
   *      @type {Integer}
   *      @description step of data iteration. If needed
   *      @default 1
   *
   * @param dependencies
   *   @type {Dependency[]}
   *   @required
   *
   * @param script
   *   @type {Function}
   *     @param info
   *       @desc Iteration of script info
   *     @param ..dependencies
   *   @required
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
