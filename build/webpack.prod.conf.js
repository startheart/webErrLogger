var config = require('../config');
var webpack = require('webpack');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');

var webpackConfig = merge(baseWebpackConfig, {
  entry: config.prod.entry,
  output: {
    path: config.prod.assetsRoot,
    filename: '[name].min.js',
    chunkFilename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
});

module.exports = webpackConfig;
