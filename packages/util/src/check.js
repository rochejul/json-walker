/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isArray(value) {
  return Array.isArray(value);
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isArrayBuffer(value) {
  return value instanceof ArrayBuffer;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isBigInt(value) {
  return typeof value === 'bigint';
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isBoolean(value) {
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
export function isDataView(value) {
  return value instanceof DataView;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isDate(value) {
  return value instanceof Date;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isError(value) {
  return value instanceof Error;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isFunction(value) {
  return typeof value === 'function';
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isGenerator(value) {
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
export function isMap(value) {
  return value instanceof Map;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isNull(value) {
  return value === null;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isNumber(value) {
  return typeof value === 'number';
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isString(value) {
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
export function isSymbol(value) {
  return typeof value === 'symbol';
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isTypedArray(value) {
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
export function isUndefined(value) {
  return value === undefined;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isWeakMap(value) {
  return value instanceof WeakMap;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isWeakRef(value) {
  return value instanceof WeakRef;
}

/**
 *
 * @param {*} value
 * @returns {boolean}
 */
export function isWeakSet(value) {
  return value instanceof WeakSet;
}
