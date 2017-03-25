var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var globby = require('globby')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cwd = process.cwd()

var entry = {};
var dirs = globby.sync(['*'], {cwd: cwd + '/lib'})

//每个页面只有一个入口文件
dirs.forEach(item => {
  entry[item] = [`./lib/${item}`]
})

module.exports = {
  context: cwd,
  entry: entry,
  output: {
    path: path.resolve(__dirname,'build'),
    publicPath: 'build',
    filename: '[name]',
    libraryTarget : 'umd',
    library : 'electronAccet'
  },
  resolve: {
    extensions: ['','.js', 'jsx']
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1']
        },
        exclude: /node_modules/
      },{
        test : /\.less$/,
        loaders : ['css','less']
      }
    ]
  }
}