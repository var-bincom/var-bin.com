// gulpfile.js

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const path = require("path");

const ASSETS_DIR = path.resolve(__dirname, "./assets");
const INDEX = path.resolve(__dirname, "./index.html");
const BASE_DIR = path.resolve("./");

// Static server
gulp.task("browser-sync", () => {
  browserSync.init({
    server: BASE_DIR,
    files: [
      ASSETS_DIR,
      INDEX
    ],
    open: false
  });
});
