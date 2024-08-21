const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const { NODE_ENV } = process.env;
const publicPath = NODE_ENV === 'development' ? '/' : './';

module.exports = {
  mode: NODE_ENV || 'production',
  entry: {
    comer: './src/comer.ts',
    react: './src/react.tsx',
  },
  output: {
    path: resolve(__dirname, './dist/'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
  },
  target: 'web',
  resolve: {
    extensions: ['.ts', '.js'],
    mainFields: ['browser', 'module', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: require.resolve('./tsconfig.json'),
          },
        },
        exclude: /node_modules/,
        include: /comer/,
      },
    ]
  },
  devtool: NODE_ENV === 'development' ? 'inline-source-map' : false,
  devServer: {
    port: 8082,
    liveReload: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    watchFiles: ["src/**/*"],
  },
  plugins: [
    new webpack.DefinePlugin({
      OBER_MODE: 'proxy',
    }),
    new HtmlWebpackPlugin({
      filename: 'comer.html',
      template: require.resolve('./assets/index.html'),
      publicPath: publicPath,
      chunks: ["vendors", "comer"],
    }),
    new HtmlWebpackPlugin({
      filename: 'react.html',
      template: require.resolve('./assets/index.html'),
      publicPath: publicPath,
      chunks: ["vendors", "react"],
    }),
  ],
};