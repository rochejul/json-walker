export const WalkerPathExpressionType = Object.freeze({
  ARRAY: 'array',
  MEMBER: 'member',
});

class WalkerPathExpression {
  /**
   * @type {string}
   */
  #type;

  /**
   * @type {*}
   */
  #expression;

  /**
   *
   * @param {{ type: string, expression: * }} param
   */
  constructor({ type, expression }) {
    this.#type = type;
    this.#expression = expression;
  }

  /**
   * @returns {string}
   */
  get expression() {
    return this.#expression;
  }

  /**
   * @returns {*}
   */
  get type() {
    return this.#type;
  }
}

export class MemberWalkerPathExpression extends WalkerPathExpression {
  /**
   *
   * @param {{ expression: string }} param
   */
  constructor({ expression }) {
    super({ type: WalkerPathExpressionType.MEMBER, expression });
  }

  /**
   * @returns {string}
   */
  toString() {
    return `${this.expression}`;
  }
}

export class ArrayWalkerPathExpression extends WalkerPathExpression {
  /**
   *
   * @param {{ expression: number }} param
   */
  constructor({ expression }) {
    super({ type: WalkerPathExpressionType.ARRAY, expression });
  }

  /**
   * @returns {string}
   */
  toString() {
    return `[${this.expression}]`;
  }
}

export class WalkerPath {
  /**
   * @type {WalkerPathExpression[]}
   */
  #paths;

  /**
   *
   * @param {{ paths: WalkerPathExpression[] }} param
   */
  constructor({ paths }) {
    this.#paths = Object.freeze(paths);
  }

  /**
   * @returns {WalkerPathExpression[]}
   */
  get paths() {
    return this.#paths;
  }

  /**
   *
   * @returns {boolean}
   */
  isRootLevel() {
    return this.#paths.length === 0;
  }

  /**
   * @returns {string}
   */
  toString() {
    let path = '';

    for (const pathExpression of this.paths) {
      if (pathExpression.type === WalkerPathExpressionType.ARRAY) {
        path += pathExpression.toString();
      } else {
        path +=
          path.length === 0
            ? pathExpression.toString()
            : `.${pathExpression.toString()}`;
      }
    }

    return path;
  }
}
