/**
 * @author Vinicius Figueiredo <vinifig@hotmail.com>
 */
import Dependency from '../dependency.js';
import * as fs from 'fs';

export default class IO extends Dependency {
  constructor (output = (process.env.DEFAULT_OUTPUT_IO || 'log_.txt')) {
    super();
    this._output = output
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

  static provider (output = process.env.IO_OUTPUT || 'log.txt') {
    if (typeof output != 'string') {
      throw new TypeError (`Expected an 'String' into 'output' parameter`);
    }
    return new IO(output);
  }
}
