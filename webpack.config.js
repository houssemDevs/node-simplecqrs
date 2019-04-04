const path = require('path');

const cleanplugin = require('clean-webpack-plugin');
const nodeExternls = require('webpack-node-externals');

const config = {
  target: 'node',
  externals: [nodeExternls()],
  mode: 'production',
  node: {
    __filename: false,
    __dirname: false,
  },
  entry: { index: path.resolve(__dirname, 'src/index.ts') },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'lib'),
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
        },
      },
    ],
  },
  plugins: [new cleanplugin()],
};

module.exports = config;
