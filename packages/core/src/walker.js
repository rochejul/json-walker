import { ObjectRequiredError } from './exceptions/object-required-error';
import { getWalker } from './impl/strategy';
import { WalkerPath } from './models/walker-path';

export { ObjectRequiredError } from './exceptions/object-required-error';

export class Walker {
  #walker;
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

  next() {
    if (this.#lastOptionalWalkerMetadata?.isNone()) {
      return this.#lastOptionalWalkerMetadata;
    }

    const optionalWalkerMetadata = this.#walker.next();
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
    const optionalWalkerMetadata = this.#walker.next();

    return {
      value: optionalWalkerMetadata.value,
      done: optionalWalkerMetadata.isNone(),
    };
  }

  [Symbol.iterator]() {
    return this;
  }
}
