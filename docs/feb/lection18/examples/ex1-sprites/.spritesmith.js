"use strict";

const util = require("util");

module.exports = {
  src: "images/**/*.{png,jpg}",
  destImage: "images/sprite/sprite.png",
  destCSS: "images/sprite/icons.css",
  imgPath: "sprite.png",
  padding: 2,
  algorithm: "top-down",
  algorithmOpts: { sort: false }
};
