// gulpfile.js

const path = require('path');

const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const htmlmin = require('gulp-htmlmin');
const rename = require('gulp-rename');
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const csso = require('postcss-csso');
const watch = require('gulp-watch');
const uncss = require('postcss-uncss');
const svgStore  = require('gulp-svgstore');
const svgo = require('gulp-svgo');
const inject = require('gulp-inject');
const image = require('gulp-image');
const del = require('del');

// for webp
const imagemin = require('gulp-imagemin');
const webp = require('imagemin-webp');
const extReplace = require('gulp-ext-replace');

const constants = require('./buildUtils/constants');
const paths = require('./buildUtils/paths');
const imageMin = require('./buildUtils/image-min-options');

const ASSETS_DIR = path.resolve(__dirname, constants.ASSETS_DIRECTORY);
const INDEX = path.resolve(__dirname, constants.INDEX_HTML);
const INDEX_TPL = path.resolve(__dirname, constants.INDEX_TEMPLATE_HTML);
const BASE_DIR = path.resolve('./');
const STYLES = path.join(ASSETS_DIR, 'less', 'styles.less');
const ASSETS_STYLES = path.join(ASSETS_DIR, 'css');
const ASSETS_IMAGES = path.join(ASSETS_DIR, constants.IMAGES_DIRECTORY);
const ASSETS_SVG = path.join(ASSETS_IMAGES, constants.SVG_REGEXP);
const SVG_SPRITE = path.join(ASSETS_IMAGES, 'sprite');

const VARBIN_ASSETS_IMAGES = path.join(ASSETS_IMAGES, '/*.{png,jpg,jpeg}');
const VARBIN_ASSETS_IMAGES_MIN = path.resolve(path.join(ASSETS_IMAGES, 'min'));

const PRES_ASSETS_IMAGES = paths.PRES_ASSETS_IMAGES('conferences', 'jsTalkCommunity/oct2019');
const PRES_IMAGES = paths.PRES_IMAGES('conferences', 'jsTalkCommunity/oct2019');
const PRES_ASSETS_STYLES = paths.PRES_ASSETS_STYLES('conferences', 'jsTalkCommunity/oct2019');
const PRES_STYLES = paths.PRES_STYLES('conferences', 'jsTalkCommunity/oct2019');
const PRES_INDEX_HTML = paths.PRES_INDEX_HTML('conferences', 'jsTalkCommunity/oct2019');

// Static server
gulp.task('browser-sync', (cb) => {
  browserSync.init({
    server: BASE_DIR,
    files: [
      INDEX,
    ],
    open: false,
  });

  gulp.watch('./assets/less/**/*.less', gulp.series('styles', 'htmlmin'));
  gulp.watch('./index.tpl.html')
    .on('change', gulp.series('styles', 'htmlmin'));

  cb();
});

// html min
gulp.task('htmlmin', () => {
  return gulp.src(INDEX_TPL)
    .pipe(htmlmin({
      collapseWhitespace: true,
    }))
    .pipe(rename(constants.INDEX_HTML))
    .pipe(gulp.dest(BASE_DIR));
});

// less, css
gulp.task('css', () => {
  return gulp.src(STYLES)
    .pipe(less())
    .pipe(postcss([
      autoprefixer,
    ]))
    .pipe(gulp.dest(ASSETS_STYLES));
});

// css min
gulp.task('cssmin', () => {
  return gulp.src(path.join(ASSETS_STYLES, 'styles.css'))
    .pipe(postcss([
      uncss({
        html: [INDEX_TPL],
      }),
      csso,
    ]))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(ASSETS_STYLES));
});

gulp.task('styles', gulp.series('css', 'cssmin'));

// watch Less files
gulp.task('watchLess', () => {
  const lessFiles = './assets/less/**/*.less';

  watch(lessFiles, gulp.series('styles'));
});

// watch html template
gulp.task('watchHtml', () => {
  watch(INDEX_TPL, gulp.series('htmlmin'));
});

// watch
gulp.task('watch', gulp.parallel('watchLess', 'watchHtml'));

gulp.task('dev', gulp.series('styles', 'htmlmin', 'browser-sync'));

gulp.task('prod', gulp.series('styles', 'htmlmin'));

// svgStore
gulp.task('svgStore', () => {
  return gulp.src(ASSETS_SVG)
    .pipe(svgo())
    .pipe(svgStore())
    .pipe(gulp.dest(SVG_SPRITE));
});

gulp.task('inject:svg', () => {
  const svg = path.join(ASSETS_IMAGES, 'sprite', 'images.svg');
  const starttag = '<!-- inject:svg -->';

  return gulp.src(INDEX)
    .pipe(inject(gulp.src(svg), {
      starttag,
      transform: (_filePath, file) => {
        // return file contents as string
        return file.contents.toString('utf8');
      },
    }))
    .pipe(gulp.dest(BASE_DIR));
});

gulp.task('sprite:inject', gulp.series('svgStore', 'htmlmin', 'inject:svg'));

gulp.task('images:var-bin:min', () => {
  return gulp.src(VARBIN_ASSETS_IMAGES)
    .pipe(image())
    .pipe(rename({
      suffix: constants.IMAGE_MIN_SUFFIX,
    }))
    .pipe(gulp.dest(VARBIN_ASSETS_IMAGES_MIN));
});

gulp.task('clean:images-pres', function () {
  return del([
    PRES_IMAGES,
  ]);
});

// tasks for conferences' presentations
gulp.task('images:min', () => {
  return gulp.src(path.join(PRES_ASSETS_IMAGES, constants.IMAGES_REGEXP))
    .pipe(image(imageMin.OPTIONS))
    .pipe(rename({
      suffix: constants.IMAGE_MIN_SUFFIX,
    }))
    .pipe(gulp.dest(path.resolve(PRES_IMAGES)));
});

gulp.task('css:pres', () => {
  return gulp.src(PRES_ASSETS_STYLES)
    .pipe(postcss([
      uncss({
        html: [PRES_INDEX_HTML],
      }),
      autoprefixer,
      csso,
    ]))
    .pipe(rename(constants.STYLES_MIN_CSS))
    .pipe(gulp.dest(PRES_STYLES));
});

gulp.task('exportWebP', function () {
  return gulp.src(path.join(PRES_ASSETS_IMAGES, '/*.{jpg,JPG,jpeg,png}'))
    .pipe(imagemin([
      webp({
        quality: 75,
      }),
    ]))
    .pipe(extReplace('.webp'))
    .pipe(gulp.dest(path.resolve(PRES_IMAGES)));
});

gulp.task('watch:pres', (cb) => {
  gulp.watch(PRES_ASSETS_IMAGES, gulp.series('clean:images-pres', 'images:min'));
  gulp.watch(PRES_ASSETS_STYLES, gulp.series('css:pres'));

  cb();
});
