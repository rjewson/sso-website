//SDL Demo site build

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var extname = require('gulp-extname');
var changed = require('gulp-changed');
var assemble = require('assemble');
var gulpAssemble = require('gulp-assemble');  //Yikes beta
var browserSync = require('browser-sync').create();
var stripDebug = require('gulp-strip-debug');
var del = require('del');
var debug = require('gulp-debug');

var src  = 'src';
var dest = 'build';
var bowerDir ='bower_components';

var config = {
  publicDir: dest,

  sass: {
    src: src + '/css/app.scss',
    watch: src + '/css/**/*.scss',
    dest: dest + '/css',
    settings: {
      outputStyle: 'nested',
      includePaths: [
        bowerDir + '/OwlCarousel2/dist/assets',
        bowerDir + '/slick-carousel/slick',
        bowerDir + '/bootstrap-sass/assets/stylesheets'
      ]
    }
  },

  images: {
    src: src + '/img/**/*',
    watch: src + '/img/**/*.*',
    dest: dest + '/img'
  },

  fonts: {
    src:[
      bowerDir + '/bootstrap-sass/assets/fonts/**/*',
      src + '/fonts/**/*'
    ],
    dest: dest + '/fonts'
  },

  assemble: {
    src: src + '/pages/*.hbs',
    watch: src + '/pages/**/*.hbs',
    dest: dest,
    layouts: [
      src + '/pages/layouts/*.hbs'
    ],
    partials: [
      src + '/pages/includes/*.hbs'
    ],
    data: [
      src + '/pages/data/*.json'
    ],
    helpers: [
      src + '/pages/helpers/*.js'
    ]
  },

  js: {
    src: [
      bowerDir + '/jquery/dist/jquery.min.js',
      bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.js',
      bowerDir + '/OwlCarousel2/dist/owl.carousel.min.js',
      bowerDir + '/slick-carousel/slick/slick.js',
      bowerDir + '/wow/dist/wow.min.js',
      src + '/js/**/*.js'
    ],
    watch: src + '/js/**/*.js',
    dest: dest + '/js',
    bundleFilename: 'app.js'
  }

};

gulp.task('fonts', function() {
  return gulp.src(config.fonts.src)
  .pipe(gulp.dest(config.fonts.dest));
});

gulp.task('js', function() {
  return gulp.src(config.js.src)
  .pipe(sourcemaps.init())
  .pipe(concat(config.js.bundleFilename))
  //.pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.js.dest))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('css', function() {
  return gulp.src(config.sass.src)
  .pipe(sourcemaps.init())
  .pipe(sass(
    config.sass.settings
  ))
  .pipe(postcss([autoprefixer({browsers:['last 2 versions']})]))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(config.sass.dest))
  .pipe(browserSync.reload({stream:true}));
});

gulp.task('assemble', function () {
  console.log(config.assemble.layouts);
  assemble.layouts(config.assemble.layouts); 
  assemble.partials(config.assemble.partials);
  assemble.data(config.assemble.data);
  // assemble.helpers(config.assemble.helpers);
  // console.dir(assemble);
  // assemble.helper('log2', function (str) {
  //   console.dir(str);
  //   // return str.toUpperCase();
  // });
  return gulp.src(config.assemble.src)
    .pipe(gulpAssemble(assemble, { layout: 'default' }))
    .pipe(extname())
    .pipe(gulp.dest(config.assemble.dest))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('images', function() {
  return gulp.src(config.images.src)
    .pipe(changed(config.images.dest)) // Ignore unchanged files
    //.pipe(imagemin()) // Add this back: Optimize
    .pipe(debug('Images run...'))
    .pipe(gulp.dest(config.images.dest));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: config.publicDir
        }
    });
});

gulp.task('clean', function () {
  del([dest]);
});

gulp.task('watch', ['build','browser-sync'], function() {
console.log('watch');
  gulp.watch(config.assemble.watch, ['assemble']);
  gulp.watch(config.js.watch, ['js']);
  gulp.watch(config.sass.watch,   ['css']);
  console.log(config.images.watch);
  gulp.watch(config.images.watch,   ['images']);
});

//TODO prod build
gulp.task('build',   ['css', 'js', 'fonts', 'images', 'assemble']);
gulp.task('default', ['build', 'watch']);


