const commonConfig = require('./webpack.config.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const webpackMerge = require('webpack-merge');

module.exports = webpackMerge(commonConfig, {

  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader']
      })
    }]
  },

  plugins: [
    new WebpackMd5Hash(),

    new ExtractTextPlugin({
      filename: 'styles.[chunkhash].css',
      allChunks: true
    })
  ]

});