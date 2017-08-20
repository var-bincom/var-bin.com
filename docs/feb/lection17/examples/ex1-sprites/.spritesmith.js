"use strict";

const util = require("util");

module.exports = {
  src: "./examples/ex1/images/**/*.{png,jpg}",
  destImage: "./examples/ex1/sprite/sprite.png",
  destCSS: "./examples/ex1/sprite/icons.css",
  imgPath: "examples/ex1/sprite/sprite.png",
  padding: 2,
  algorithm: "top-down",
  algorithmOpts: { sort: false },
  cssOpts: {
    cssClass: function (item) {
      return util.format(".ic-%s:before", item.name);
    }
  }
};
