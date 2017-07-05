/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 * @interface Dependency
 * @description Dependency interface
 */
export default class Dependency {

  constructor (name) {
    this._name = name;
  }
  /**
   * @member Dependency#type {String} - Getter of Dependency name
   **/
  get type () {
    return this._name;
  }

  /**
   * @method Dependency.provider
   * @description Provider of {@link Dependency} instance
   * @returns {Dependency} return a instance class that uses {@link Dependency} 
   **/
  static provider () {
    return new Dependency();
  }
}
