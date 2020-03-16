import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: './index.js',
  output: [
    {
      file: `./dist/${pkg.name}.js`,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: `./dist/${pkg.name}.es.js`,
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
  ],
};
