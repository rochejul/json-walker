<p>
    <a href="https://www.npmjs.com/package/@json-walker/browser">
    <img src="https://img.shields.io/npm/v/@json-walker/browser" alt="npm version">
  </a>

  <a href="https://github.com/rochejul/json-walker/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@json-walker/browser.svg" alt="license">
  </a>

  <a href="https://packagephobia.now.sh/result?p=@json-walker/browser">
    <img src="https://packagephobia.now.sh/badge?p=@json-walker/browser" alt="install size">
  </a>

  <a href="https://snyk.io/test/github/rochejul/json-walker">
    <img src="https://snyk.io/test/github/rochejul/json-walker/badge.svg?targetFile=packages/browser/package.json" alt="Known Vulnerabilities">
  </a>

  <a href="https://github.com/rochejul/json-walker/actions/workflows/node.js.yml">
    <img src="https://github.com/rochejul/json-walker/actions/workflows/node.js.yml/badge.svg" alt="Node.js Unit Test">
  </a>
</p>

# @json-walker/browser

Package to load the JSON walker into a browser

## Usage

Ensure to import the polyfill, through an import:

```js
import * as walker from '@wjson-walker/browser';
```

Or from the HTML `script` tag:

```html
<script defer="defer" src="./node_modules/@json-walker/browser/build/bundle.js">
```

You could find in the [build folder](./build/) various targets

## Commands

- `npm run dev:build`: Bundle the package for various targets
- `npm run dev:linting`: Lint files

## Contributing

- [Guidelines](../../docs/GUIDELINES.md)
- [Contributing](../../docs/CONTRIBUTING.md)
- [Code of conducts](../../docs/CODE_OF_CONDUCTS.md)
