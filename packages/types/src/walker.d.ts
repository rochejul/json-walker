declare module '@json-walker/core' {
  import type { Option } from '@json-walker/util';

  type WalkerPathExpressionType = 'member' | 'array';
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

  interface BaseWalkerPathExpression {
    readonly type: WalkerPathExpressionType;
    readonly expression: string;
  }

  interface ArrayWalkerPathExpression {
    readonly type: 'array';
    readonly expression: number;
  }

  type WalkerPathExpression =
    | BaseWalkerPathExpression
    | ArrayWalkerPathExpression;

  interface WalkerPath {
    readonly paths: WalkerPathExpression[];
    toString(): string;
  }

  interface BaseWalkerMetadata {
    readonly propertyName: string;
    readonly propertyValue: unknown;
    readonly propertyType: WalkerPropertyType;
    readonly path: WalkerPath;
  }

  interface ObjectWalkerMetadata extends BaseWalkerMetadata {
    readonly propertyType: 'object';
    readonly walker: Walker;
  }

  type WalkerMetadata = BaseWalkerMetadata | ObjectWalkerMetadata;

  class ObjectRequiredError extends Error {
    constructor();
  }

  class Walker {
    constructor(object: unknown);
    next(): Option<WalkerMetadata>;
  }

  export {
    Walker,
    ObjectRequiredError,
    WalkerPath,
    WalkerPathExpression,
    BaseWalkerPathExpression,
    ArrayWalkerPathExpression,
    WalkerPathExpressionType,
    WalkerMetadata,
    BaseWalkerMetadata,
    ObjectWalkerMetadata,
    WalkerPropertyType,
  };
}
