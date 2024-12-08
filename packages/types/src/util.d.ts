declare module '@json-walker/util' {
  type WalkerPropertyType =
    | 'undefined'
    | 'null'
    | 'array'
    | 'arraybuffer'
    | 'bigint'
    | 'bigint64array'
    | 'boolean'
    | 'dataview'
    | 'date'
    | 'error'
    | 'function'
    | 'generator'
    | 'map'
    | 'number'
    | 'object'
    | 'string'
    | 'symbol'
    | 'typedarray'
    | 'weakmap'
    | 'weakref'
    | 'weakset'; // Based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures
  // And on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects

  class Option<T> {
    private constructor();

    isNone(): boolean;
    isSome(): boolean;
    readonly value: T | undefined | null;

    static from<F>(value: F): Option<F>;

    static none(): Option<null>;
  }

  function getPropertyType(value: unknown): WalkerPropertyType;

  export { Option, WalkerPropertyType, getPropertyType };
}
