import { Option } from '@json-walker/util';
import { ArrayWalkerPathExpression, WalkerPath } from '../models/walker-path';
import { getWalker } from './strategy';
import { DeadEndWalker } from './dead-end-walker';

export class ArrayWalker {
  #array;
  #currentWalkerPath;
  #index = 0;
  #walker;
  #lastOptionalWalkerMetadata;

  constructor({ value, currentWalkerPath }) {
    this.#array = value;
    this.#currentWalkerPath = currentWalkerPath;

    if (!currentWalkerPath.isRootLevel()) {
      this.#walker = new DeadEndWalker({ value, currentWalkerPath });
    }
  }

  nextStep() {
    if (this.#walker) {
      this.#lastOptionalWalkerMetadata = this.#walker.nextStep();

      if (this.#lastOptionalWalkerMetadata.isSome()) {
        return this.#lastOptionalWalkerMetadata;
      }

      this.#walker = null;
    }

    if (this.#index < this.#array.length) {
      const currentIndex = this.#index;
      const value = this.#array[this.#index];
      this.#index += 1;

      const { paths } = this.#currentWalkerPath;
      const walkerPath = new WalkerPath({
        paths: [
          ...paths,
          new ArrayWalkerPathExpression({ expression: currentIndex }),
        ],
      });

      this.#walker = getWalker({ value, currentWalkerPath: walkerPath });

      this.#lastOptionalWalkerMetadata = this.#walker.nextStep();
      return this.#lastOptionalWalkerMetadata;
    }

    return Option.none();
  }
}
