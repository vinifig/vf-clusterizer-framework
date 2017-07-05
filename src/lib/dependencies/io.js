/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 * @class IO
 * @constructor
 * @description Dependency for read and write file
 */
import Dependency from '../dependency.js';
import * as fs from 'fs';

class IO extends Dependency {
  /**
   * @constructor
   *
   * @param [output=%DEFAULT_OUTPUT_IO] {String} output file
   **/
  constructor (output = (process.env.DEFAULT_OUTPUT_IO || 'log_.txt')) {
    super('IO');
    this._output = output;
  }

  /**
   * @method IO#setOutput
   * @description Setter of output path
   * @returns {Void}
   **/
  setOutput (path) {
    this._output = path;
  }

  /**
   * @member IO#textContent {String} - Getter/Setter of file content
   **/
  static get textContent () {
    return 'need instance'
  }

  get textContent () {
    try {
      return fs.readFileSync(this._output);
    } catch (e) {
      return '';
    }
  }

  set textContent (content) {
    return fs.writeFileSync(this._output, content);
  }

  /**
   * @method Dependency.provider
   * @description Provider of {@link Dependency} instance
   * @returns {Dependency} return a instance class that uses {@link Dependency}
   **/
  static provider (output = process.env.IO_OUTPUT || 'log.txt') {
    if (typeof output != 'string') {
      throw new TypeError (`Expected an 'String' into 'output' parameter`);
    }
    return new IO(output);
  }
}

export default IO;
