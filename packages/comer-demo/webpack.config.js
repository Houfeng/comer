const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { resolve } = require('path');

const { NODE_ENV } = process.env;
const publicPath = NODE_ENV === 'development' ? '/' : './';

module.exports = {
  mode: NODE_ENV || 'production',
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, './dist/'),
    filename: '[name].bundle.js',
    publicPath: publicPath,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          priority: -10
        },
      },
    }
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
        test: /\.ts?$/,
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
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      OBER_CONFIG: JSON.stringify({ mode: 'property' }),
    }),
    new HtmlWebpackPlugin({
      template: require.resolve('./assets/index.html'),
      publicPath: publicPath,
    })
  ],
};