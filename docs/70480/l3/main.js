// main.js
(function(global) {
  function onLoadHandler() {
    console.info("onLoadHandler");

    geoLocationHandler();
  }

  function geoLocationHandler() {
    const geoLocator = global.navigator.geolocation;
    const optionsCurrentPosition = {
      enableHighAccuracy: true,
      timeout: 45000
    };
    const geoResults = document.getElementById("geoResults");

    function successCurrentPosition(pos) {
      console.info("successCurrentPosition", pos);

      const p = document.createElement("p");

      const accuracy = pos.coords.accuracy;
      const latitude = pos.coords.latitude;
      const longitude = pos.coords.longitude;
      const timestamp = pos.timestamp;

      const posMessage = `Accuracy: ${accuracy}\nLatitude: ${latitude}\nLongitude: ${longitude}\nTimestamp: ${timestamp}`;

      p.innerText = posMessage;
      geoResults.appendChild(p);
    }

    function errorCurrentPosition(err) {
      console.error("errorCurrentPosition", err);

      const p = document.createElement(p);
      const errorMessage = `Error: ${err.message}\nCode: ${err.code}`;

      p.innerText = errorMessage;

      geoResults.appendChild(p);
    }

    geoLocator.getCurrentPosition(successCurrentPosition, errorCurrentPosition, optionsCurrentPosition);
  }

  global.addEventListener("load", onLoadHandler, false);
})(window);
