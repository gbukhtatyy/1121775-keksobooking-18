'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsContainer = document.querySelector('.map .map__pins');
  var mapFiltersContainer = document.querySelector('.map .map__filters-container');

  window.map = {
    /**
     * Получение координат маркера для получения адреса
     * @return {Object} объект с координатами x и y
     */
    getCoordinatesPinMain: function () {
      var x = Math.floor(parseInt(mapPinMain.style.left, 10) + window.data.MAP_PIN_MAIN_WIDTH / 2);
      var y = Math.floor(parseInt(mapPinMain.style.top, 10) + window.data.MAP_PIN_MAIN_HEIGHT);
      return {
        x: x,
        y: y
      };
    },

    /**
     * Отображение маркеров объявлений на карте
     * @param {Array} adverts массив объявлений для отображения
     */
    showPins: function (adverts) {
      var fragmentPins = document.createDocumentFragment();

      for (var i = 0; i < adverts.length; i++) {
        fragmentPins.appendChild(window.pin.createElement(adverts[i]));
      }

      mapPinsContainer.appendChild(fragmentPins);
    },

    /**
     * Отображение карточек объявлений на карте
     * @param {Array} adverts массив объявлений для отображения
     */
    showMapDescriptions: function (adverts) {
      var fragmentDescriptions = document.createDocumentFragment();

      for (var i = 0; i < adverts.length; i++) {
        fragmentDescriptions.appendChild(window.card.createElement(adverts[i]));
      }

      mapFiltersContainer.before(fragmentDescriptions);
    }
  };
})();
