import { getPropertyType } from '@json-walker/util';

export class WalkerMetadata {
  /**
   * @type {string}
   */
  #propertyName;

  /**
   * @type {*}
   */
  #propertyValue;

  /**
   * @type {string}
   */
  #propertyType;

  /**
   * @type {WalkerPath}
   */
  #propertyPath;

  /**
   *
   * @param {{ propertyName: string, propertyValue: *, propertyPath: WalkerPath }} param
   */
  constructor({ propertyName, propertyValue, propertyPath }) {
    this.#propertyName = propertyName;
    this.#propertyValue = propertyValue;
    this.#propertyPath = propertyPath;
    this.#propertyType = getPropertyType(propertyValue);
  }

  /**
   * @returns {string}
   */
  get propertyName() {
    return this.#propertyName;
  }

  /**
   * @returns {*}
   */
  get propertyValue() {
    return this.#propertyValue;
  }

  /**
   * @returns {string}
   */
  get propertyType() {
    return this.#propertyType;
  }

  /**
   * @returns {WalkerPath}
   */
  get propertyPath() {
    return this.#propertyPath;
  }
}
