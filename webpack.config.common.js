const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  context: path.resolve(__dirname, './src'),

  entry: {
    index: './index.js',
    vendor: './vendor.js'
  },

  output: {
    path: path.join(__dirname, './build'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',

  module: {
    rules: [{
      test: /\.js$/,
      loaders: ['babel-loader', 'eslint-loader']
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'file-loader'
    }, {
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader?limit=10000&mimetype=application/font-woff'
    }, {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: ['file-loader']
    }]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),

    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'dependency'
    })

  ]
};