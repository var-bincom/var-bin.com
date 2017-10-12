// main.js

"use strict";

(function(global) {
  "use strict";

  function onLoadHandler() {
    console.info("onLoadHandler");
  }

  global.addEventListener("load", onLoadHandler, false);
})(window);
