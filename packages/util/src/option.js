import { IllegalInstantationError } from './exceptions/illegal-instantion-error';
import { isNull, isUndefined } from './check';

class Option {
  constructor() {
    throw new IllegalInstantationError();
  }

  /**
   *
   * @param {*} value
   * @returns {Option<*>}
   */
  static from(value) {
    return Object.seal(new PrivateOption(value));
  }

  /**
   *
   * @returns {Option<null>}
   */
  static none() {
    return Object.seal(new PrivateOption(null));
  }
}

class PrivateOption {
  #value;

  constructor(value) {
    this.#value = value;
  }

  /**
   * @returns {boolean}
   */
  isNone() {
    return isNull(this.#value) || isUndefined(this.#value);
  }

  /**
   * @returns {boolean}
   */
  isSome() {
    return !this.isNone();
  }

  /**
   * @returns {*}
   */
  get value() {
    return this.#value;
  }
}

Object.setPrototypeOf(PrivateOption.prototype, Option.prototype); // Option's contructor raises an exception
// We cannot use "super()" in the constructor and so it will produce some weird inherance
// This way is an equivalence of "super()"

export { Option };
