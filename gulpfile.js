var gulp       = require('gulp'),
    order      = require('gulp-order')
    concat     = require('gulp-concat'),
    deporder   = require('gulp-deporder'),
    stripDebug = require('gulp-strip-debug'),
    uglify     = require('gulp-uglify'),
    pump       = require('pump'),
    postcss    = require('gulp-postcss'),
    cssnano    = require('cssnano'),
    folder     = { src: 'src/',
                   build: 'build/'
                 };

gulp.task('js', function(cb) {
  pump([
        gulp.src(folder.src + 'js/*.js'),
        order([
          folder.src + 'js/constants.js',
          folder.src + 'js/chart.js',
          folder.src + 'js/barChart.js',
          folder.src + 'js/lineChart.js',
          folder.src + 'js/*.js',
        ], { base: './' }),
        deporder(),
        concat('main.js'),
        gulp.dest(folder.build + 'js/')
    ],
    cb
  );
});

gulp.task('js-minify', function(cb) {
  pump([
        gulp.src(folder.src + 'js/*.js'),
        order([
          folder.src + 'js/constants.js',
          folder.src + 'js/chart.js',
          folder.src + 'js/barChart.js',
          folder.src + 'js/lineChart.js',
          folder.src + 'js/*.js',
        ], { base: './' }),
        deporder(),
        concat('main.min.js'),
        stripDebug(),
        uglify(),
        gulp.dest(folder.build + 'js/')
    ],
    cb
  );
});

gulp.task('css', function(cb) {
  pump([
        gulp.src(folder.src + 'css/*.css'),
        postcss(cssnano),
        gulp.dest(folder.build + 'css/')
    ],
    cb
  );
});

gulp.task('run', ['js', 'js-minify', 'css']);

gulp.task('watch', function() {
  gulp.watch(folder.src + 'js/**/*', ['js']);
  gulp.watch(folder.src + 'css/**/*', ['css']);

});

gulp.task('build', ['run']);
gulp.task('default', ['run', 'watch']);
