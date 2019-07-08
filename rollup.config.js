import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

import pkg from './package.json';

export default {
  input: './src/FactoryBuilder.js',
  output: [
    {
      file: `./dist/${pkg.name}.js`,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },
    {
      file: `./dist/${pkg.name}.es.js`,
      format: 'es',
      exports: 'named',
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
