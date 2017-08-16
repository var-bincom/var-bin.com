"use strict";

const util = require("util");

module.exports = {
  src: "./client/img/icons/**/*.{png,jpg}",
  destImage: ".bin/public/img/icons.png",
  destCSS: "client/css/generated/icons.css",
  imgPath: "/img/icons.png",
  padding: 2,
  algorithm: "top-down",
  algorithmOpts: { sort: false },
  cssOpts: {
    cssClass: function (item) {
      return util.format(".ic-%s:before", item.name);
    }
  }
};
