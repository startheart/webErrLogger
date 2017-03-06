// https://github.com/shelljs/shelljs
require('shelljs/global');
env.NODE_ENV = 'production';

var path = require('path');
var config = require('../config');
var ora = require('ora');
var webpack = require('webpack');
var webpackConfig = require('./webpack.prod.conf');
var name = require('../package.json').name;

var spinner = ora('building for production...');
spinner.start();

var assetsPath = config.prod.assetsRoot;
// rm('-rf', assetsPath);
mkdir('-p', assetsPath);

webpack(webpackConfig, function (err, stats) {
  spinner.stop();
  if (err) {
    throw err;
  }

  mkdir('-p', name);
  cp('-R', assetsPath, name);

  process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n');

  process.stdout.write('build finish! \n');

});
