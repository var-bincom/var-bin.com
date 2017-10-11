// main.js

(function(global) {
  "use strict";

  function onLoadHandler() {
    console.info("onLoadHandler");

    workWithArray();
  }

  function workWithArray() {
    let arr = ["a", "b", "c"];

    ar.push("d");
  }

  global.addEventListener("load", onLoadHandler, false);
})(window);
