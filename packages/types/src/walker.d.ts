declare module '@json-walker/core' {
  import type { Option, WalkerPropertyType } from '@json-walker/util';

  type WalkerPathExpressionType = 'member' | 'array';

  interface MemberWalkerPathExpression {
    readonly type: 'member';
    readonly expression: string;
    toString(): string;
  }

  interface ArrayWalkerPathExpression {
    readonly type: 'array';
    readonly expression: number;
    toString(): string;
  }

  type WalkerPathExpression =
    | MemberWalkerPathExpression
    | ArrayWalkerPathExpression;

  interface WalkerPath {
    readonly paths: WalkerPathExpression[];
    isRootLevel(): boolean;
    toString(): string;
  }

  interface WalkerMetadata {
    readonly propertyName: string;
    readonly propertyPath: WalkerPath;
    readonly propertyType: WalkerPropertyType;
    readonly propertyValue: unknown;
  }

  class ObjectRequiredError extends Error {
    constructor();
  }

  class Walker {
    constructor(object: unknown);
    next(): Option<WalkerMetadata>;
  }

  class IterableWalker implements Iterator<unknown> {
    next(): IteratorReturnResult<unknown>;
  }

  export {
    Walker,
    IterableWalker,
    ObjectRequiredError,
    WalkerPath,
    WalkerPathExpression,
    MemberWalkerPathExpression,
    ArrayWalkerPathExpression,
    WalkerPathExpressionType,
    WalkerMetadata,
  };
}
