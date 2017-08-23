// .spritesmith.js

"use strict";

const util = require("util");
const SRC = "images/icons/**/*.{png,jpg}";
const DEST_SPRITE = "images/sprite.png";
const DEST_CSS = "sass/_icons.scss";
const IMG_PATH = "../images/sprite.png";
const PADDING = 5;

module.exports = {
  src: `${SRC}`,
  destImage: `${DEST_SPRITE}`,
  destCSS: `${DEST_CSS}`,
  imgPath: `${IMG_PATH}`,
  padding: PADDING,
  algorithm: "top-down",
  algorithmOpts: {
    sort: false
  }
};
