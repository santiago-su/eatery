const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const host = process.env.APP_HOST || 'localhost';

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

const config = {
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://${host}:3001`,
    path.resolve(__dirname, 'frontend', 'main.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader', options: { sourceMap: true }
          }, {
            loader: 'sass-loader', options: { sourceMap: true }
          }],
          // use style-loader in development
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [extractSass, new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
