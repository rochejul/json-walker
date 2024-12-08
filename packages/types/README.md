<p>
    <a href="https://www.npmjs.com/package/@json-walker/types">
    <img src="https://img.shields.io/npm/v/@json-walker/types" alt="npm version">
  </a>

  <a href="https://github.com/rochejul/json-walker/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@json-walker/types.svg" alt="license">
  </a>

  <a href="https://packagephobia.now.sh/result?p=@json-walker/types">
    <img src="https://packagephobia.now.sh/badge?p=@json-walker/types" alt="install size">
  </a>

  <a href="https://snyk.io/test/github/rochejul/web-component-attribute-polyfilln">
    <img src="https://snyk.io/test/github/rochejul/json-walker/badge.svg?targetFile=packages/types/package.json" alt="Known Vulnerabilities">
  </a>

  <a href="https://github.com/rochejul/json-walker/actions/workflows/node.js.yml">
    <img src="https://github.com/rochejul/json-walker/actions/workflows/node.js.yml/badge.svg" alt="Node.js Unit Test">
  </a>
</p>

# @json-walker/types

Typescript definition of the walker

## Definitions

### Walker

```typescript
class Walker {
  constructor(object: unknown);
  nextStep(): Option<WalkerMetadata>;
}

interface WalkerMetadata {
  readonly propertyName: string;
  readonly propertyPath: WalkerPath;
  readonly propertyType: WalkerPropertyType;
  readonly propertyValue: unknown;
}
```

### IterableWalker

```typescript
class IterableWalker implements Iterator<unknown> {
  next(): IteratorReturnResult<unknown>;
}
```

### Option

```typescript
class Option<T> {
  private constructor();

  isNone(): boolean;
  isSome(): boolean;
  readonly value: T | undefined | null;

  static from<F>(value: F): Option<F>;

  static none(): Option<null>;
}
```

## Commands

## Contributing

- [Guidelines](../../docs/GUIDELINES.md)
- [Contributing](../../docs/CONTRIBUTING.md)
- [Code of conducts](../../docs/CODE_OF_CONDUCTS.md)
