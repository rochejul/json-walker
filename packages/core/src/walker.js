import { ObjectRequiredError } from './exceptions/object-required-error';
import { getWalker } from './impl/strategy';
import { WalkerPath } from './models/walker-path';

export { ObjectRequiredError } from './exceptions/object-required-error';

export class Walker {
  /**
   * @type {Walker}
   */
  #walker;

  /**
   * @type {Option<WalkerMetadata>}
   */
  #lastOptionalWalkerMetadata;

  /**
   * @param {*} value
   * @throws {ObjectRequiredError}
   */
  constructor(value) {
    if (value === undefined || value === null) {
      throw new ObjectRequiredError();
    }

    this.#walker = getWalker({
      value,
      currentWalkerPath: new WalkerPath({ paths: [] }),
    });
  }

  /**
   * @returns {Option<WalkerMetadata>}
   */
  nextStep() {
    if (this.#lastOptionalWalkerMetadata?.isNone()) {
      return this.#lastOptionalWalkerMetadata;
    }

    const optionalWalkerMetadata = this.#walker.nextStep();
    this.#lastOptionalWalkerMetadata = optionalWalkerMetadata;

    return optionalWalkerMetadata;
  }
}

export class IterableWalker {
  #walker;

  /**
   * @param {*} value
   * @throws {ObjectRequiredError}
   */
  constructor(value) {
    if (value === undefined || value === null) {
      throw new ObjectRequiredError();
    }

    this.#walker = new Walker(value);
  }

  next() {
    const optionalWalkerMetadata = this.#walker.nextStep();

    return {
      value: optionalWalkerMetadata.value,
      done: optionalWalkerMetadata.isNone(),
    };
  }

  [Symbol.iterator]() {
    return this;
  }
}
