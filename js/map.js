'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');

  window.map = {
    getCoordinatesPinMain: function () {
      var x = Math.floor(mapPinMain.style.left.slice(0, -2) * 1 + window.data.MAP_PIN_MAIN_WIDTH / 2);
      var y = Math.floor(mapPinMain.style.top.slice(0, -2) * 1 + window.data.MAP_PIN_MAIN_HEIGHT);
      return {
        x: x,
        y: y
      };
    }
  };
})();
