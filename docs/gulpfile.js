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
const uncss = require("postcss-uncss");
const svgStore  = require("gulp-svgstore");
const svgo = require("gulp-svgo");
const inject = require("gulp-inject");
const image = require("gulp-image");

const imageMinOptions = {
  jpegRecompress: ['--strip', '--quality', 'medium', '--max', 80],
  mozjpeg: ['-optimize', '-progressive'],
  svgo: ['--enable', 'cleanupIDs', '--disable', 'convertColors']
};

const ASSETS_DIR = path.resolve(__dirname, "./assets");
const INDEX = path.resolve(__dirname, "./index.html");
const INDEX_TPL = path.resolve(__dirname, "./index.tpl.html");
const BASE_DIR = path.resolve("./");
const STYLES = path.join(ASSETS_DIR, "less", "styles.less");
const ASSETS_STYLES = path.join(ASSETS_DIR, "css");
const ASSETS_IMAGES = path.join(ASSETS_DIR, "images");
const ASSETS_SVG = path.join(ASSETS_IMAGES, "/*.svg");
const SVG_SPRITE = path.join(ASSETS_IMAGES, "sprite");
const KharkivCssImagesAssets = path.join(__dirname, "KharkivCSS2018", "assets", "images");
const KharkivCssImages = path.join(__dirname, "KharkivCSS2018", "shower", "pictures");
const VARBIN_ASSETS_IMAGES = path.join(ASSETS_IMAGES, "/*.{png,jpg,jpeg}");
const VARBIN_ASSETS_IMAGES_MIN = path.resolve(path.join(ASSETS_IMAGES, "min"));
const PRES_ASSETS_IMAGES = path.join(__dirname, "jsTalkCommunity", "february2019", "assets", "images");
const PRES_IMAGES = path.join(__dirname, "jsTalkCommunity", "february2019", "shower", "pictures");
const PRES_ASSETS_STYLES = path.join(__dirname, "jsTalkCommunity", "february2019", "assets", "styles", "styles.css");
const PRES_STYLES = path.join(__dirname, "jsTalkCommunity", "february2019", "shower", "styles");
const PRES_INDEX_HTML = path.join(__dirname, "jsTalkCommunity", "february2019", "shower", "index.html");

// Static server
gulp.task("browser-sync", (cb) => {
  browserSync.init({
    server: BASE_DIR,
    files: [
      INDEX
    ],
    open: false
  });

  gulp.watch("./assets/less/**/*.less", gulp.series("styles", "htmlmin"));
  gulp.watch("./index.tpl.html")
    .on("change", gulp.series("styles", "htmlmin"));

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
      uncss({
        html: ["./index.tpl.html"],
      }),
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

gulp.task("dev", gulp.series("styles", "htmlmin", "browser-sync"));

gulp.task("prod", gulp.series("styles", "htmlmin"));

// svgStore
gulp.task("svgStore", () => {
  return gulp.src(ASSETS_SVG)
    .pipe(svgo())
    .pipe(svgStore())
    .pipe(gulp.dest(SVG_SPRITE));
});

gulp.task("inject:svg", () => {
  const svg = path.join(ASSETS_IMAGES, "sprite", "images.svg");
  const starttag = "<!-- inject:svg -->";

  return gulp.src(INDEX)
    .pipe(inject(gulp.src(svg), {
      starttag,
      transform: (filePath, file) => {
        // return file contents as string
        return file.contents.toString("utf8")
      }
    }))
    .pipe(gulp.dest(BASE_DIR));
});

gulp.task("sprite:inject", gulp.series("svgStore", "htmlmin", "inject:svg"));

gulp.task("images:var-bin:min", () => {
  return gulp.src(VARBIN_ASSETS_IMAGES)
    .pipe(image())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(VARBIN_ASSETS_IMAGES_MIN));
});

// tasks for conferences' presentations
gulp.task("images:min", () => {
  return gulp.src(path.join(PRES_ASSETS_IMAGES, "/*.{png,jpg,jpeg,svg,gif}"))
    .pipe(image(imageMinOptions))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest(path.resolve(PRES_IMAGES)));
});

gulp.task("css:pres", () => {
  return gulp.src(PRES_ASSETS_STYLES)
    .pipe(postcss([
      uncss({
        html: [PRES_INDEX_HTML],
      }),
      autoprefixer,
      csso
    ]))
    .pipe(rename("styles.min.css"))
    .pipe(gulp.dest(PRES_STYLES));
});

gulp.task("watch:pres", (cb) => {
  const styles = path.join(__dirname, "KharkivCSS2018", "assets", "styles", "styles.css");
  gulp.watch(styles, gulp.series("css:pres"));

  cb();
});
