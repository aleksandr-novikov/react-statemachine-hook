import pkg from './package.json';
import config from './rollup.config';

export default {
  ...config,
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
  ],
};
