import { getPropertyType } from '@json-walker/util';

export class WalkerMetadata {
  #propertyName;
  #propertyValue;
  #propertyType;
  #propertyPath;

  constructor({ propertyName, propertyValue, propertyPath }) {
    this.#propertyName = propertyName;
    this.#propertyValue = propertyValue;
    this.#propertyPath = propertyPath;
    this.#propertyType = getPropertyType(propertyValue);
  }

  get propertyName() {
    return this.#propertyName;
  }

  get propertyValue() {
    return this.#propertyValue;
  }

  get propertyType() {
    return this.#propertyType;
  }

  get propertyPath() {
    return this.#propertyPath;
  }
}

class SubWalkerMetadata extends WalkerMetadata {
  #walker;

  constructor({ propertyName, propertyValue, propertyPath, walker }) {
    super({ propertyName, propertyValue, propertyPath });

    this.#walker = walker;
  }

  get walker() {
    return this.#walker;
  }
}

export class ObjectWalkerMetadata extends SubWalkerMetadata {}

export class ArrayWalkerMetadata extends SubWalkerMetadata {}
