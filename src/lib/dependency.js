/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 */
export default class Dependency {

  constructor () {
    this._type = 'Dependency';
  }

  get type () {
    return this._type;
  }

  static provider () {
    return new Dependency();
  }
}
