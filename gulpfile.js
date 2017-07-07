var gulp        = require('gulp'),
    order       = require('gulp-order'),
    rename      = require('gulp-rename'),
    beautify    = require('gulp-beautify'),
    concat      = require('gulp-concat'),
    deporder    = require('gulp-deporder'),
    stripDebug  = require('gulp-strip-debug'),
    uglify      = require('gulp-uglify'),
    pump        = require('pump'),
    cssBeautify = require('gulp-cssbeautify')
    postcss     = require('gulp-postcss'),
    cssnano     = require('cssnano');


var folder    = {
                   src: 'src/',
                   build: 'build/'
                 };
    files     = ['main', 'bar', 'line', 'area', 'pie', 'multiLine', 'stackedBar'];
    filesReqd = {
    'main'      : [
                      folder.src + 'js/constants.js',
                      folder.src + 'js/chart.js',
                      folder.src + 'js/barChart.js',
                      folder.src + 'js/lineChart.js',
                      folder.src + 'js/*.js',
                  ],
    'pie'       : [ folder.src + 'js/pieChart.js' ],
    'bar'       : [
                      folder.src + 'js/constants.js',
                      folder.src + 'js/chart.js',
                      folder.src + 'js/barChart.js',
                  ],
    'line'      : [
                      folder.src + 'js/constants.js',
                      folder.src + 'js/chart.js',
                      folder.src + 'js/lineChart.js',
                  ],
    'area'      : [
                      folder.src + 'js/constants.js',
                      folder.src + 'js/chart.js',
                      folder.src + 'js/areaChart.js',
                  ],
    'multiLine' : [
                      folder.src + 'js/constants.js',
                      folder.src + 'js/chart.js',
                      folder.src + 'js/lineChart.js',
                      folder.src + 'js/multiLineChart.js',
                  ],
    'stackedBar': [
                      folder.src + 'js/constants.js',
                      folder.src + 'js/chart.js',
                      folder.src + 'js/barChart.js',
                      folder.src + 'js/stackedBarChart.js',
                  ]
};

function jsFileCreate(fileName, filesReqd, cb) {
  return pump([
        gulp.src(filesReqd),
        order(filesReqd, { base: './' }),
        deporder(),
        concat(fileName + '.min.js'),
        stripDebug(),
        uglify(),
        gulp.dest(folder.build + 'js/min/'),
        beautify({ indent_size: 2 }),
        rename(fileName + '.js'),
        gulp.dest(folder.build + 'js/')
    ], cb);
}


function createJsFiles() {
  return files.forEach(function(type) {
    return jsFileCreate(type, filesReqd[type]);
  });
}


gulp.task('js', createJsFiles());

gulp.task('css-minify', function(cb) {
  pump([
        gulp.src(folder.src + 'css/*.css'),
        postcss(cssnano),
        rename('fubar-charts.min.css'),
        gulp.dest(folder.build + 'css/min/')
      ], cb);
});

gulp.task('css', ['css-minify'], function(cb) {
  pump([
        gulp.src(folder.build + 'css/min/fubar-charts.min.css'),
        postcss(cssnano),
        cssBeautify(),
        rename('fubar-charts.css'),
        gulp.dest(folder.build + 'css/')
      ], cb);
});

gulp.task('run', ['js', 'css']);

gulp.task('watch', function() {
  gulp.watch(folder.src + 'js/**/*', ['js']);
  gulp.watch(folder.src + 'css/**/*', ['css']);
});

gulp.task('build', ['run']);
gulp.task('default', ['run', 'watch']);
