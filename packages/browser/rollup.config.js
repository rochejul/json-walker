import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'cjs',
      file: 'build/bundle.cjs',
      name: 'JsonWalker',
    },
    {
      format: 'es',
      file: 'build/bundle.js',
      name: 'JsonWalker',
    },
    {
      format: 'iife',
      file: 'build/bundle.iife.js',
      name: 'JsonWalker',
    },
    {
      format: 'umd',
      file: 'build/bundle.umd.js',
      name: 'JsonWalker',
    },
    {
      format: 'amd',
      file: 'build/bundle.amd.js',
      name: 'JsonWalker',
    },
  ],
  plugins: [nodeResolve({ browser: true })],
};
