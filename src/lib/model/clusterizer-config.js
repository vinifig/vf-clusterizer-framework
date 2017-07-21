/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 *
 *
 * @class ClusterizerConfig
 * @constructor
 * @description Core class for distribute process
 *
 */
class ClusterizerConfig {
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
      throw new TypeError(`Expected an 'Function' on 'script' parameter`)
    }

    if (!! before && typeof before != 'function') {
      throw new TypeError(`Expected an 'Function' on 'before' parameter`)
    }

    if (!! before && ! after ) {
      throw new TypeError(`Expected 'after' parameter with 'before' parameter`)
    }

    if (!! after && typeof after != 'function') {
      throw new TypeError(`Expected an 'Function' on 'after' parameter`)
    }

    this.id = config.id;
    this.devices = config.devices;
    this.step = config.step || 1;
    this.totalSize = config.totalSize || 0;
    this.dependencies = dependencies;
    this.script = script;
    this.before = before;
    this.after = after;
  }
}

export default ClusterizerConfig;
