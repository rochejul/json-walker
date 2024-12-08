import { IllegalInstantationError } from './exceptions/illegal-instantion-error';

class Option {
  constructor() {
    throw new IllegalInstantationError();
  }

  static from(value) {
    return Object.seal(new PrivateOption(value));
  }
}

class PrivateOption {
  #value;

  constructor(value) {
    this.#value = value;
  }

  isNone() {
    return this.#value === null || this.#value === undefined;
  }

  isSome() {
    return !this.isNone();
  }

  get value() {
    return this.#value;
  }
}

Object.setPrototypeOf(PrivateOption.prototype, Option.prototype); // Option's contructor raises an exception
// We cannot use "super()" in the constructor and so it will produce some weird inherance
// This way is an equivalence of "super()"

export { Option };
