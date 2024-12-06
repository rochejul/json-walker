import { ObjectRequiredError } from './exceptions/object-required-error';

export { ObjectRequiredError } from './exceptions/object-required-error';

export class Walker {
  //#object;

  /**
   * @param {*} object
   * @throws {ObjectRequiredError}
   */
  constructor(object) {
    if (object === undefined || object === null) {
      throw new ObjectRequiredError();
    }

    //this.#object = object;
  }

  next() {
    return null;
  }
}
