import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import replace from 'rollup-plugin-replace';
import pkg from './package.json';

export default {
  // input: 'src/index.ts',
  input: 'src/sample-app/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'iife',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
    {
      file: pkg.module,
      exports: 'named',
      format: 'es',
      sourcemap: true,
      globals: {
        react: 'React',
        'react-dom': 'ReactDOM',
      },
    },
  ],
  external: [
    'react-dom',
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
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    terser(),
  ],
};
