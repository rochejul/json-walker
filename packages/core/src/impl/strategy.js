import { getPropertyType, WalkerPropertyType } from '@json-walker/util';
import { Option } from '@json-walker/util';
import {
  ArrayWalkerPathExpression,
  MemberWalkerPathExpression,
  WalkerPath,
} from '../models/walker-path';
import { WalkerMetadata } from '../models/walker-metadata';

/**
 * @param {{ value: *, currentWalkerPath: WalkerPath }} param
 * @returns {Walker}
 */
export function getWalker({ value, currentWalkerPath }) {
  const propertyType = getPropertyType(value);

  if (WalkerPropertyType.ARRAY === propertyType) {
    return new ArrayWalker({ value, currentWalkerPath });
  }

  if (WalkerPropertyType.OBJECT === propertyType) {
    return new ObjectWalker({ value, currentWalkerPath });
  }

  return new DeadEndWalker({ value, currentWalkerPath });
}

class ArrayWalker {
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

class DeadEndWalker {
  #lastOptionalWalkerMetadata;

  constructor({ value, currentWalkerPath }) {
    this.#lastOptionalWalkerMetadata = Option.from(
      new WalkerMetadata({
        propertyName: '',
        propertyValue: value,
        propertyPath: currentWalkerPath,
      }),
    );
  }

  nextStep() {
    const optionalWalkerMetadata = this.#lastOptionalWalkerMetadata;
    this.#lastOptionalWalkerMetadata = Option.none();
    return optionalWalkerMetadata;
  }
}

class ObjectWalker {
  #array;
  #object;
  #currentWalkerPath;
  #index = 0;
  #walker;
  #lastOptionalWalkerMetadata;

  constructor({ value, currentWalkerPath }) {
    this.#object = value;
    this.#array = Object.getOwnPropertyNames(value);
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
      const propertyName = this.#array[this.#index];
      const value = this.#object[propertyName];
      this.#index += 1;

      const { paths } = this.#currentWalkerPath;
      const walkerPath = new WalkerPath({
        paths: [
          ...paths,
          new MemberWalkerPathExpression({ expression: propertyName }),
        ],
      });

      this.#walker = getWalker({ value, currentWalkerPath: walkerPath });

      this.#lastOptionalWalkerMetadata = this.#walker.nextStep();
      return this.#lastOptionalWalkerMetadata;
    }

    return Option.from(null);
  }
}
