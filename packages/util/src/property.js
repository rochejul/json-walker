import * as check from './check';

export const WalkerPropertyType = Object.freeze({
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
    predicate: check.isUndefined,
    propertyType: WalkerPropertyType.UNDEFINED,
  },
  {
    predicate: check.isNull,
    propertyType: WalkerPropertyType.NULL,
  },
  {
    predicate: check.isArray,
    propertyType: WalkerPropertyType.ARRAY,
  },
  {
    predicate: check.isArrayBuffer,
    propertyType: WalkerPropertyType.ARRAYBUFFER,
  },
  {
    predicate: check.isBigInt,
    propertyType: WalkerPropertyType.BIGINT,
  },
  {
    predicate: check.isBoolean,
    propertyType: WalkerPropertyType.BOOLEAN,
  },
  {
    predicate: check.isDataView,
    propertyType: WalkerPropertyType.DATAVIEW,
  },
  {
    predicate: check.isDate,
    propertyType: WalkerPropertyType.DATE,
  },
  {
    predicate: check.isError,
    propertyType: WalkerPropertyType.ERROR,
  },
  {
    predicate: check.isGenerator, // Generators are functions, so we should specify them before the function predicate
    propertyType: WalkerPropertyType.GENERATOR,
  },
  {
    predicate: check.isFunction,
    propertyType: WalkerPropertyType.FUNCTION,
  },
  {
    predicate: check.isMap,
    propertyType: WalkerPropertyType.MAP,
  },
  {
    predicate: check.isString,
    propertyType: WalkerPropertyType.STRING,
  },
  {
    predicate: check.isNumber,
    propertyType: WalkerPropertyType.NUMBER,
  },
  {
    predicate: check.isSymbol,
    propertyType: WalkerPropertyType.SYMBOL,
  },
  {
    predicate: check.isTypedArray,
    propertyType: WalkerPropertyType.TYPEDARRAY,
  },
  {
    predicate: check.isWeakMap,
    propertyType: WalkerPropertyType.WEAKMAP,
  },
  {
    predicate: check.isWeakRef,
    propertyType: WalkerPropertyType.WEAKREF,
  },
  {
    predicate: check.isWeakSet,
    propertyType: WalkerPropertyType.WEAKSET,
  },
];

/**
 *
 * @param {*} value
 * @returns {string}
 */
export function getPropertyType(value) {
  const predicate = getPropertyTypePredicates.find(({ predicate }) =>
    predicate(value),
  );

  return predicate?.propertyType ?? WalkerPropertyType.OBJECT;
}
