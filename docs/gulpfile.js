// gulpfile.js

const path = require("path");

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const htmlmin = require("gulp-htmlmin");
const rename = require("gulp-rename");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const watch = require("gulp-watch");

const ASSETS_DIR = path.resolve(__dirname, "./assets");
const INDEX = path.resolve(__dirname, "./index.html");
const INDEX_TPL = path.resolve(__dirname, "./index.tpl.html");
const BASE_DIR = path.resolve("./");
const STYLES = path.join(ASSETS_DIR, "less", "styles.less");
const ASSETS_STYLES = path.join(ASSETS_DIR, "css");

// Static server
gulp.task("browser-sync", (cb) => {
  browserSync.init({
    server: BASE_DIR,
    files: [
      INDEX
    ],
    open: false
  });

  cb();
});

// html min
gulp.task("htmlmin", () => {
  return gulp.src(INDEX_TPL)
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(rename("index.html"))
    .pipe(gulp.dest(BASE_DIR));
});

// less, css
gulp.task("css", () => {
  return gulp.src(STYLES)
    .pipe(less())
    .pipe(postcss([
      autoprefixer
    ]))
    .pipe(gulp.dest(ASSETS_STYLES));
});

// css min
gulp.task("cssmin", () => {
  return gulp.src(path.join(ASSETS_STYLES, "styles.css"))
    .pipe(postcss([
      csso
    ]))
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest(ASSETS_STYLES));
});

gulp.task("styles", gulp.series("css", "cssmin"));

// watch Less files
gulp.task("watchLess", () => {
  const lessFiles = "./assets/less/**/*.less";

  watch(lessFiles, gulp.series("styles"));
});

// watch html template
gulp.task("watchHtml", () => {
  watch("./index.tpl.html", gulp.series("htmlmin"));
});

// watch
gulp.task("watch", gulp.parallel("watchLess", "watchHtml"));

gulp.task("dev", gulp.series("css", "htmlmin"));

gulp.task("prod", gulp.series("styles", "htmlmin"));
