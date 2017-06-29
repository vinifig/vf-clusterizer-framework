export default class Clusterizer {
  constructor (id, dependencies, script) {
    this._id = id;
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
