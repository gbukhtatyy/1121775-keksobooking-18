'use strict';

(function () {

  var mapPinMain = document.querySelector('.map__pin--main');

  window.map = {
    getCoordinatesPinMain: function () {
      var x = Math.floor(parseInt(mapPinMain.style.left, 10) + window.data.MAP_PIN_MAIN_WIDTH / 2);
      var y = Math.floor(parseInt(mapPinMain.style.top, 10) + window.data.MAP_PIN_MAIN_HEIGHT);
      return {
        x: x,
        y: y
      };
    }
  };
})();
