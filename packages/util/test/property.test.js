import { describe, test, expect } from '@jest/globals';
import { getPropertyType } from '../src/property';

describe('util/property', () => {
  describe('getPropertyType', () => {
    const types = [
      {
        value: undefined,
        propertyType: 'undefined',
      },
      {
        value: null,
        propertyType: 'null',
      },
      {
        value: [],
        propertyType: 'array',
      },
      {
        value: new Array(),
        propertyType: 'array',
      },
      {
        value: new ArrayBuffer(8),
        propertyType: 'arraybuffer',
      },
      {
        value: BigInt(9007199254740991),
        propertyType: 'bigint',
      },
      {
        value: false,
        propertyType: 'boolean',
      },
      {
        value: true,
        propertyType: 'boolean',
      },
      {
        value: new Boolean(false),
        propertyType: 'boolean',
      },
      {
        value: new DataView(new ArrayBuffer(2)),
        propertyType: 'dataview',
      },
      {
        value: new Date(8.64e15),
        propertyType: 'date',
      },
      {
        value: new Error('somemessage'),
        propertyType: 'error',
      },
      {
        value: function () {},
        propertyType: 'function',
      },
      {
        value: function notAnonymousFunction() {},
        propertyType: 'function',
      },
      {
        value: () => ({}),
        propertyType: 'function',
      },
      {
        value: async function () {},
        propertyType: 'function',
      },
      {
        value: async function notAnonymousFunction() {},
        propertyType: 'function',
      },
      {
        value: async () => ({}),
        propertyType: 'function',
      },
      {
        value: new Function(),
        propertyType: 'function',
      },
      {
        value: function* () {},
        propertyType: 'generator',
      },
      {
        value: function* notAnonymousFunction() {},
        propertyType: 'generator',
      },
      {
        value: async function* () {},
        propertyType: 'generator',
      },
      {
        value: async function* notAnonymousFunction() {},
        propertyType: 'generator',
      },
      {
        value: new Map(),
        propertyType: 'map',
      },
      {
        value: 0,
        propertyType: 'number',
      },
      {
        value: 42,
        propertyType: 'number',
      },
      {
        value: 55.55,
        propertyType: 'number',
      },
      {
        value: NaN,
        propertyType: 'number',
      },
      {
        value: {},
        propertyType: 'object',
      },
      {
        value: new (class {})(),
        propertyType: 'object',
      },
      {
        value: new (class NotAnonymousClass {})(),
        propertyType: 'object',
      },
      {
        value: '',
        propertyType: 'string',
      },
      {
        value: 'acme',
        propertyType: 'string',
      },
      {
        value: new String('foo'),
        propertyType: 'string',
      },
      {
        value: Symbol(),
        propertyType: 'symbol',
      },
      {
        value: Symbol('some value'),
        propertyType: 'symbol',
      },
      {
        value: new Int8Array(8),
        propertyType: 'typedarray',
      },
      {
        value: new Uint8Array(2),
        propertyType: 'typedarray',
      },
      {
        value: new Uint8ClampedArray(2),
        propertyType: 'typedarray',
      },
      {
        value: new Int16Array(2),
        propertyType: 'typedarray',
      },
      {
        value: new Uint16Array(2),
        propertyType: 'typedarray',
      },
      {
        value: new Int32Array(2),
        propertyType: 'typedarray',
      },
      {
        value: new Uint32Array(2),
        propertyType: 'typedarray',
      },
      {
        value: new Float32Array(2),
        propertyType: 'typedarray',
      },
      {
        value: new Float64Array(2),
        propertyType: 'typedarray',
      },
      {
        value: new BigInt64Array(new ArrayBuffer(24)),
        propertyType: 'typedarray',
      },
      {
        value: new BigUint64Array(2),
        propertyType: 'typedarray',
      },
      {
        value: new WeakMap(),
        propertyType: 'weakmap',
      },
      {
        value: new WeakRef({}),
        propertyType: 'weakref',
      },
      {
        value: new WeakSet(),
        propertyType: 'weakset',
      },
    ];

    test.each(types)(
      'it returns the propertyType "$propertyType" for value $value',
      ({ value, propertyType }) => {
        // Act
        const actual = getPropertyType(value);

        // Assert
        expect(actual).toBe(propertyType);
      },
    );
  });
});
