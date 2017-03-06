var path = require('path');
var version = require('../package.json').version;
var name = require('../package.json').name;

module.exports = {
  dev: {
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    port: 9000,
    entry: {
      Logger: './src/logger.js',
      app: './example/index.js'
    }
  },
  prod: {
    assetsRoot: path.resolve(__dirname, '../dist/' + version),
    assetsPublicPath: '//xxx.niubi.com/static/webapp/' + name + '/' + version + '/',
    entry: {
      logger: './src/logger.js'
    }
  }
};
