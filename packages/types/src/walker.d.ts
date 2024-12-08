declare module '@json-walker/core' {
  import type { Option, WalkerPropertyType } from '@json-walker/util';

  type WalkerPathExpressionType = 'member' | 'array';

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

  interface ArrayWalkerMetadata extends BaseWalkerMetadata {
    readonly propertyType: 'array';
    readonly walker: Walker;
  }

  type WalkerMetadata =
    | BaseWalkerMetadata
    | ObjectWalkerMetadata
    | ArrayWalkerMetadata;

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
    ArrayWalkerMetadata,
  };
}
