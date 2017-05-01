const webpack = require('webpack');
const path = require('path');
const host = process.env.APP_HOST || 'localhost';

const config = {
  devtool: 'eval',
  entry: [
    path.resolve(__dirname, 'frontend', 'main.js')
  ],
  output: {
    path: path.resolve(__dirname, 'public', 'assets'),
    filename: 'bundle.js',
    publicPath: '/public/assets'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public', 'assets'),
    port: 3001
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
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = config;
