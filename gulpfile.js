require('colors');
var del = require('del');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var less = require('gulp-less');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');
var path = require('path');
var removeUseStrict = require("gulp-remove-use-strict");
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack-stream')
var config = require('./webpack.config.js')

//实现gulp插件
var gutil = require('gulp-util');
var through = require('through2');
var pp = require('preprocess');

var isBuild = true;
function err(error) {
  console.error('[ERROR]'.red + error.message);
  this.emit('end');
}

gulp.task('css', function() {
  return gulp.src(['lib/**/*.less'])
    .pipe(gulpif(!isBuild, plumber(err)))
    .pipe(less())
    .pipe(postcss([autoprefixer({browsers: ['> 1%', 'last 2 version']})]))
    .pipe(gulp.dest('build'));
});

var replaceRelativeUrl = function (options) {
  return through.obj(function (file, enc, cb) {
    if(file.isNull()){
      this.push(file);
      return cb();
    }
    if(file.isStream()) {
      this.emit('error', new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
      return cb();
    }
    var content = pp.preprocess(file.contents.toString(), options || {});
    result = content.match(/require\(\"(\w+)\"\)/);
    if(result)  content = content.replace(result[0],'require("'+path.join(process.cwd(), 'build/js/'+result[1]) +'")')
    file.contents = new Buffer(content);
    this.push(file);
    cb();
  })
}

gulp.task('js', function () {
  return gulp.src(['lib/**/*.js'])
    .pipe(gulpif(!isBuild, plumber(err)))
    .pipe(babel({
      presets: ['es2015', 'react', 'stage-1']
    }))
    .pipe(webpack(config))
    .pipe(gulp.dest('build'));
});

gulp.task("copy", function() {
  return gulp.src(["lib/**/*.png", "lib/**/*.jpg", "lib/**/*.jpeg", "lib/**/*.gif", "lib/**/*.json",
      "lib/**/*.html", "lib/**/*.htm", "lib/**/*.ttf", "lib/**/*.eot", "lib/**/*.svg"
    ])
    .pipe(gulp.dest("build"));
});

gulp.task('default', ['css', 'js', 'copy']);

gulp.task("watch", ["default"], function() {
  gulp.watch(['lib/**/*.js'], ["js"]);
  gulp.watch(['lib/**/*.less'], ["css"]);
});
