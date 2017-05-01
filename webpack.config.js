const webpack = require('webpack');
const path = require('path');
const host = process.env.APP_HOST || 'localhost';

const config = {
  devtool: 'eval',
  entry: [
    `webpack-dev-server/client?http://${host}:3001`,
    path.resolve(__dirname, 'frontend', 'main.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/public/assets'
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
        test: /\.(css|scss)$/,
        loaders: ['style-loader','css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  }
};

module.exports = config;
