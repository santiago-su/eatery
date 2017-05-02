const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const host = process.env.APP_HOST || 'localhost';

const config = {
  devtool: 'source-map',
  entry: [
    'webpack/hot/dev-server',
    `webpack-dev-server/client?http://${host}:3001`,
    path.resolve(__dirname, 'frontend', 'js', 'main.js')
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
        test: /\.html$/,
        exclude: /(node_modules)/,
        loaders: ['html']
      },
      {
        test: /\.(css|scss)$/,
        loaders: ['style-loader','css-loader', 'postcss-loader', 'sass-loader']
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin()
  ]
};

module.exports = config;
