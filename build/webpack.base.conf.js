var path = require('path');
var webpack = require('webpack');
var version = require('../package.json').version;
var config = require('../config');
var projectRoot = path.resolve(__dirname, '../');

module.exports = {
  entry: {},
  output: {
    path: config.prod.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config.prod.assetsPublicPath : config.dev.assetsPublicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    library: '[name]',
    libraryTarget: 'umd'
  },
  resolve: {
    root: path.join(__dirname, 'src')
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader'
      },
      {
        test: /\.png|\.gif$/,
        loader: 'url-loader?limit=28192'
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(version)
    })
  ]
};
