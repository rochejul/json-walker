<p>
  <a href="https://www.npmjs.com/package/@json-walker/core">
    <img src="https://img.shields.io/npm/v/@json-walker/core" alt="npm version">
  </a>

  <a href="https://github.com/rochejul/json-walker/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@json-walker/core.svg" alt="license">
  </a>

  <a href="https://codeclimate.com/github/rochejul/json-walker">
    <img src="https://codeclimate.com/github/rochejul/json-walker/badges/gpa.svg" alt="Code Climate">
  </a>

  <a href="https://snyk.io/test/github/rochejul/json-walker">
    <img src="https://snyk.io/test/github/rochejul/json-walker/badge.svg?targetFile=package.json" alt="Known Vulnerabilities">
  </a>

  <a href="https://github.com/rochejul/json-walker/actions/workflows/node.js.yml">
    <img src="https://github.com/rochejul/json-walker/actions/workflows/node.js.yml/badge.svg" alt="Node.js Unit Test">
  </a>
</p>

# json-walker

Create a JSON walker api (nodejs/web) to walk through EcmaScript objects.

## Motivation

We frequently need to go deeply in objects and to have some information, such as the path, etc...

## Usage

We have two usages: `Walker` and `IterableWalker`.
The first allows to define your own way to iterate.
The second could be used as an iterable.

### Walker usage

```js
function grabProperties(value) {
  const properties = [];
  const walker = new Walker(value);
  let optionalWalkerMetadata;

  do {
    optionalWalkerMetadata = walker.nextStep();

    if (optionalWalkerMetadata.isSome()) {
      properties.push({
        path: optionalWalkerMetadata.value.propertyPath.toString(),
        type: optionalWalkerMetadata.value.propertyType,
        value: optionalWalkerMetadata.value.propertyValue,
      });
    }
  } while (optionalWalkerMetadata.isSome());

  return properties;
}

const secondLevel = { label: 'foo' };
const array = [secondLevel];
const firstLevel = { records: array };
const actual = grabProperties(firstLevel);

/* actual content:
 * [
    {
      path: 'records',
      type: 'array',
      value: [{ label: 'foo' }],
    },
    {
      path: 'records[0]',
      type: 'object',
      value: { label: 'foo' },
    },
    {
      path: 'records[0].label',
      type: 'string',
      value: 'foo',
    },
  ]
 */
```

### IterableWalker usage

```js
function grabProperties(value) {
  const properties = [];
  const walker = new IterableWalker(value);

  for (const value of walker) {
    properties.push({
      path: value.propertyPath.toString(),
      type: value.propertyType,
      value: value.propertyValue,
    });
  }

  return properties;
}

const secondLevel = { label: 'foo' };
const array = [secondLevel];
const firstLevel = { records: array };
const actual = grabProperties(firstLevel);

/* actual content:
 * [
    {
      path: 'records',
      type: 'array',
      value: [{ label: 'foo' }],
    },
    {
      path: 'records[0]',
      type: 'object',
      value: { label: 'foo' },
    },
    {
      path: 'records[0].label',
      type: 'string',
      value: 'foo',
    },
  ]
 */
```

## Commands

- `npm run dev:build`: Build the project over packages
- `npm run dev:check`: Run tests and styling over packages
- `npm run dev:format`: Format files over packages
- `npm run dev:format:check`: Check files format over packages
- `npm run dev:linting`: Lint files over packages
- `npm run dev:styling`: Format and lint files over packages
- `npm run dev:publish`: Publish all the packages on npm registry
- `npm test`: Run tests over packages
- `npm run test:coverage`: Run tests over packages and see coverage reports

## Contributing

- [Guidelines](./docs/GUIDELINES.md)
- [Contributing](./docs/CONTRIBUTING.md)
- [Code of conducts](./docs/CODE_OF_CONDUCTS.md)
