import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      exports: 'named',
      format: 'es',
      sourcemap: true,
    },
    {
      file: pkg.module,
      exports: 'named',
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      rollupCommonJSResolveHack: true,
      exclude: '**/__tests__/**',
      clean: true,
    }),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.ts', '.tsx'],
    }),
    commonjs({
      include: 'node_modules/**',
    }),
    terser(),
  ],
};
