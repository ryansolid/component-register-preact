import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: [{
    file: 'lib/component-register-preact.js',
    format: 'cjs',
    exports: 'named'
  }, {
    file: 'dist/component-register-preact.js',
    format: 'es'
  }],
  plugins: [
    nodeResolve({ extensions: ['.js', '.ts'] }),
    babel({
      extensions: ['.js', '.ts'],
      presets: ["@babel/preset-typescript"],
      exclude: 'node_modules/**'
    })
  ],
  external: ['preact', 'preact/hooks', 'component-register'],
};