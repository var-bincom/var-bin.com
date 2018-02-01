// gulpfile.js

const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const path = require("path");

const BASE_DIR = path.resolve("./assets");
const INDEX = path.resolve("./index.html");

// Static server
gulp.task("browser-sync", () => {
  browserSync.init({
    server: {
      baseDir: BASE_DIR,
      index: INDEX
    }
  });
});
