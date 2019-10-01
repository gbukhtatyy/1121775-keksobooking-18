'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsContainer = document.querySelector('.map .map__pins');
  var mapFiltersContainer = document.querySelector('.map .map__filters-container');

  var clickCloseCardHandler = function (card) {
    return function () {
      card.remove();
      removeActivePin();
    };
  };

  var mapEscPressHandler = function (evt) {
    window.util.isEscEvent(evt, function () {
      removeCards();
      removeActivePin();
    });
  };

  var removeCards = function () {
    document.removeEventListener('keydown', mapEscPressHandler);

    var cards = mapContainer.querySelectorAll('.map__card');
    cards.forEach(function (card) {
      card.querySelector('.popup__close').removeEventListener('click', clickCloseCardHandler(card));
      card.remove();
    });
  };

  var showPinDescription = function (advert) {
    removeCards();

    var card = window.card.createElement(advert);

    document.addEventListener('keydown', mapEscPressHandler);
    card.querySelector('.popup__close').addEventListener('click', clickCloseCardHandler(card));

    mapFiltersContainer.before(card);
  };

  var removeActivePin = function () {
    var pin = mapPinsContainer.querySelector('.map__pin--active');

    if (pin) {
      pin.classList.remove('map__pin--active');
    }
  };

  mapPinsContainer.addEventListener('click', function (evt) {
    var button = evt.target;

    if (button.tagName !== 'button') {
      button = button.closest('button');
    }

    if (button === null) {
      return;
    }

    if (button.classList.contains('map__pin--main')) {
      return;
    }

    var idAdvert = button.getAttribute('data-id');
    var advert = window.data.adverts[idAdvert];

    removeActivePin();

    button.classList.add('map__pin--active');

    showPinDescription(advert);
  });

  window.map = {
    getMapBounds: function () {
      return {
        x: {
          min: -(window.data.MAP_PIN_MAIN_WIDTH / 2),
          max: parseInt(mapContainer.clientWidth, 10) - (window.data.MAP_PIN_MAIN_WIDTH / 2)
        },
        y: {
          min: window.data.MAP_LOCATION_Y_MIN,
          max: window.data.MAP_LOCATION_Y_MAX
        }
      };
    },

    /**
     * Получение координат маркера для получения адреса
     * @return {Object} объект с координатами x и y
     */
    getCoordinatesPinMain: function () {
      var x = Math.floor(parseInt(mapPinMain.style.left, 10));
      var y = Math.floor(parseInt(mapPinMain.style.top, 10));

      if (mapContainer.classList.contains('map--faded')) {
        // Метка адреса круглая берется центр
        x += Math.floor(window.data.MAP_PIN_MAIN_WIDTH / 2);
        y += Math.floor((window.data.MAP_PIN_MAIN_ROUND_HEIGHT) / 2);
      } else {
        // Метка адреса не круглая берется точка на которую указывает маркер
        x += Math.floor(window.data.MAP_PIN_MAIN_WIDTH / 2);
        y += Math.floor(window.data.MAP_PIN_MAIN_HEIGHT);
      }

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
        fragmentPins.appendChild(window.pin.createElement(adverts[i], i));
      }

      mapPinsContainer.appendChild(fragmentPins);
    },

    removePins: function () {
      removeCards();

      var pins = mapPinsContainer.querySelectorAll('.map__pin');

      pins.forEach(function (pin) {
        if (pin.classList.contains('map__pin--main') === false) {
          pin.remove();
        }
      });
    }
  };
})();
