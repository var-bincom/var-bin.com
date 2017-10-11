// main.js

(function(global) {
  "use strict";

  function onLoadHandler() {
    console.info("onLoadHandler");

    appCacheHandler();
  }

  function appCacheHandler() {
    const appCache = global.applicationCache;

    function checkChache(e) {
      console.log("checking for an update to the application manifest, or the application is being cached for the first time", e);
    }

    function cached(e) {
      console.log("cache successfully downloaded.", e)
    }

    function updateready(e) {
      console.log("The resources listed in the manifest have been newly redownloaded, and the swapCache method might be called.");
      appCache.swapCache();
    }

    appCache.onchecking = checkChache;
    appCache.oncached = cached;
    appCache.onupdateready = updateready;
  }

  global.addEventListener("load", onLoadHandler, false);

})(window);
