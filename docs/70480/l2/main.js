// main.js

(function(global) {

  function onLoadHandler() {
    //alert("onLoadHandler");
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

    appCache.onchecking = checkChache;
    appCache.oncached = cached;
  }

  global.addEventListener("load", onLoadHandler, false);

})(window);
