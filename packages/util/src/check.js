export function isArray(value) {
  return Array.isArray(value);
}

export function isArrayBuffer(value) {
  return value instanceof ArrayBuffer;
}

export function isBigInt(value) {
  return typeof value === 'bigint';
}

export function isBoolean(value) {
  if (value instanceof Boolean) {
    return true;
  }

  return value === false || value === true;
}

export function isDataView(value) {
  return value instanceof DataView;
}

export function isDate(value) {
  return value instanceof Date;
}

export function isError(value) {
  return value instanceof Error;
}

export function isFunction(value) {
  return typeof value === 'function';
}

export function isGenerator(value) {
  return (
    isFunction(value) &&
    ['GeneratorFunction', 'AsyncGeneratorFunction'].includes(
      value.constructor.name,
    )
  );
}

export function isMap(value) {
  return value instanceof Map;
}

export function isNull(value) {
  return value === null;
}

export function isNumber(value) {
  return typeof value === 'number';
}

export function isString(value) {
  if (value instanceof String) {
    return true;
  }

  return typeof value === 'string';
}

export function isSymbol(value) {
  return typeof value === 'symbol';
}

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

export function isUndefined(value) {
  return value === undefined;
}

export function isWeakMap(value) {
  return value instanceof WeakMap;
}

export function isWeakRef(value) {
  return value instanceof WeakRef;
}

export function isWeakSet(value) {
  return value instanceof WeakSet;
}
