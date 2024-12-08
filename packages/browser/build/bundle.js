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

[
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
