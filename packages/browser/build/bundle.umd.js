(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.JsonWalker = {}));
})(this, (function (exports) { 'use strict';

  class ObjectRequiredError extends Error {
    constructor() {
      super();
      Error.captureStackTrace(this, ObjectRequiredError);
    }
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isArray(value) {
    return Array.isArray(value);
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isArrayBuffer(value) {
    return value instanceof ArrayBuffer;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isBigInt(value) {
    return typeof value === 'bigint';
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isBoolean(value) {
    if (value instanceof Boolean) {
      return true;
    }

    return value === false || value === true;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isDataView(value) {
    return value instanceof DataView;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isDate(value) {
    return value instanceof Date;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isError(value) {
    return value instanceof Error;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isFunction(value) {
    return typeof value === 'function';
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isGenerator(value) {
    return (
      isFunction(value) &&
      ['GeneratorFunction', 'AsyncGeneratorFunction'].includes(
        value.constructor.name,
      )
    );
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isMap(value) {
    return value instanceof Map;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isNull(value) {
    return value === null;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isNumber(value) {
    return typeof value === 'number';
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isString(value) {
    if (value instanceof String) {
      return true;
    }

    return typeof value === 'string';
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isSymbol(value) {
    return typeof value === 'symbol';
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isTypedArray(value) {
    return [
      'Int8Array',
      'Uint8Array',
      'Uint8ClampedArray',
      'Int16Array',
      'Uint16Array',
      'Int32Array',
      'Uint32Array',
      'Float32Array',
      'Float64Array',
      'BigInt64Array',
      'BigUint64Array',
    ].includes(value?.constructor?.name);
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isUndefined(value) {
    return value === undefined;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isWeakMap(value) {
    return value instanceof WeakMap;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isWeakRef(value) {
    return value instanceof WeakRef;
  }

  /**
   *
   * @param {*} value
   * @returns {boolean}
   */
  function isWeakSet(value) {
    return value instanceof WeakSet;
  }

  class IllegalInstantationError extends Error {
    constructor() {
      super();
      Error.captureStackTrace(this, IllegalInstantationError);
    }
  }

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

  const WalkerPropertyType = Object.freeze({
    UNDEFINED: 'undefined',
    NULL: 'null',
    ARRAY: 'array',
    ARRAYBUFFER: 'arraybuffer',
    BIGINT: 'bigint',
    BOOLEAN: 'boolean',
    DATAVIEW: 'dataview',
    DATE: 'date',
    ERROR: 'error',
    FUNCTION: 'function',
    GENERATOR: 'generator',
    MAP: 'map',
    NUMBER: 'number',
    OBJECT: 'object',
    STRING: 'string',
    SYMBOL: 'symbol',
    TYPEDARRAY: 'typedarray',
    WEAKMAP: 'weakmap',
    WEAKREF: 'weakref',
    WEAKSET: 'weakset',
  });

  const getPropertyTypePredicates = [
    {
      predicate: isUndefined,
      propertyType: WalkerPropertyType.UNDEFINED,
    },
    {
      predicate: isNull,
      propertyType: WalkerPropertyType.NULL,
    },
    {
      predicate: isArray,
      propertyType: WalkerPropertyType.ARRAY,
    },
    {
      predicate: isArrayBuffer,
      propertyType: WalkerPropertyType.ARRAYBUFFER,
    },
    {
      predicate: isBigInt,
      propertyType: WalkerPropertyType.BIGINT,
    },
    {
      predicate: isBoolean,
      propertyType: WalkerPropertyType.BOOLEAN,
    },
    {
      predicate: isDataView,
      propertyType: WalkerPropertyType.DATAVIEW,
    },
    {
      predicate: isDate,
      propertyType: WalkerPropertyType.DATE,
    },
    {
      predicate: isError,
      propertyType: WalkerPropertyType.ERROR,
    },
    {
      predicate: isGenerator, // Generators are functions, so we should specify them before the function predicate
      propertyType: WalkerPropertyType.GENERATOR,
    },
    {
      predicate: isFunction,
      propertyType: WalkerPropertyType.FUNCTION,
    },
    {
      predicate: isMap,
      propertyType: WalkerPropertyType.MAP,
    },
    {
      predicate: isString,
      propertyType: WalkerPropertyType.STRING,
    },
    {
      predicate: isNumber,
      propertyType: WalkerPropertyType.NUMBER,
    },
    {
      predicate: isSymbol,
      propertyType: WalkerPropertyType.SYMBOL,
    },
    {
      predicate: isTypedArray,
      propertyType: WalkerPropertyType.TYPEDARRAY,
    },
    {
      predicate: isWeakMap,
      propertyType: WalkerPropertyType.WEAKMAP,
    },
    {
      predicate: isWeakRef,
      propertyType: WalkerPropertyType.WEAKREF,
    },
    {
      predicate: isWeakSet,
      propertyType: WalkerPropertyType.WEAKSET,
    },
  ];

  /**
   *
   * @param {*} value
   * @returns {string}
   */
  function getPropertyType(value) {
    const predicate = getPropertyTypePredicates.find(({ predicate }) =>
      predicate(value),
    );

    return predicate?.propertyType ?? WalkerPropertyType.OBJECT;
  }

  const WalkerPathExpressionType = Object.freeze({
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

  class MemberWalkerPathExpression extends WalkerPathExpression {
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

  class ArrayWalkerPathExpression extends WalkerPathExpression {
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

  class WalkerPath {
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

  class WalkerMetadata {
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

  /**
   * @param {{ value: *, currentWalkerPath: WalkerPath }} param
   * @returns {Walker}
   */
  function getWalker({ value, currentWalkerPath }) {
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

  class Walker {
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

  class IterableWalker {
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

  exports.IterableWalker = IterableWalker;
  exports.Walker = Walker;

}));
