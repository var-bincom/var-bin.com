// main.js

"use strict";

(function(global) {
  "use strict";

  function onLoadHandler() {
    console.info("onLoadHandler");

    doWork();
  }

  /* function longStory() {
    const result = document.getElementById("result");

    const work = 10000000;
    console.time("Array initialize");
    let a = new Array(work);
    let sum = 0;

    for (let i = 0; i < work; i++) {
      a[i] = i * i;
      sum += i * i;
    }
    result.innerText = `result: ${sum}`;
    console.timeEnd("Array initialize");
  } */

  function doWorkHandler() {
    const result = document.getElementById("result");
    const stopWorker = document.getElementById("stopWorker");
    const worker = new Worker("calculateWorker.js");

    result.innerText = "";

    worker.onmessage = (evt) => {
      try {
        result.innerText = `result: ${evt.data}`;
      } catch (e) {
        alert(e.message);
      }
    }

    worker.onerror = (err) => {
      alert(err.message + err.filename + err.lineno);
    }

    worker.postMessage("");

    function stopWorkerHandler() {
      worker.terminate();
    }

    stopWorker.addEventListener("click", stopWorkerHandler, false)
  }

  function doWork() {
    const doWorkButton = document.getElementById("doWork");

    doWorkButton.addEventListener("click", doWorkHandler, false);
  }

  global.addEventListener("load", onLoadHandler, false);
})(window);
