import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/index.js',
  output: {
    file: 'lib/component-register-preact.js',
    format: 'cjs',
    exports: 'named'
  },
  external: ['preact', 'component-register'],
  plugins: [
    nodeResolve({ extensions: ['.js'] })
  ]
};