export const WalkerPathExpressionType = Object.freeze({
  ARRAY: 'array',
  MEMBER: 'member',
});

class WalkerPathExpression {
  #type;
  #expression;

  constructor({ type, expression }) {
    this.#type = type;
    this.#expression = expression;
  }

  get expression() {
    return this.#expression;
  }

  get type() {
    return this.#type;
  }
}

export class MemberWalkerPathExpression extends WalkerPathExpression {
  constructor({ expression }) {
    super({ type: WalkerPathExpressionType.MEMBER, expression });
  }

  toString() {
    return `${this.expression}`;
  }
}

export class ArrayWalkerPathExpression extends WalkerPathExpression {
  constructor({ expression }) {
    super({ type: WalkerPathExpressionType.ARRAY, expression });
  }

  toString() {
    return `[${this.expression}]`;
  }
}

export class WalkerPath {
  #paths;

  constructor({ paths }) {
    this.#paths = Object.freeze(paths);
  }

  get paths() {
    return this.#paths;
  }

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
