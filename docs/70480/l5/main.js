// main.js

(function(global) {
  "use strict";

  function onLoadHandler() {
    console.info("onLoadHandler");

    workWithArray();
    try {
      ball();
    } catch (error) {
      console.error(error);
    }

  }

  function workWithArray() {
    let arr = ["a", "b", "c"];

    try {
      arr.push("d");
    } catch (error) {
      const errorMessage = error.message;
      const errorNumber = error.number;
      const errorName = error.name;

      console.error(`Message: ${errorMessage}\nNumber: ${errorNumber}\nType: ${errorName}`);
    } finally {
      console.log("finally block");
    }

    console.log(arr);
  }

  function ball() {
    const ball = {
      x: -1,
      y: -1,
      draw: function DrawBall(c) {
        if (this.x < 0) {
          throw new SyntaxError("Invalid X coordinate");
        }
      }
    }

    ball.draw();
  }

  global.addEventListener("load", onLoadHandler, false);
})(window);
