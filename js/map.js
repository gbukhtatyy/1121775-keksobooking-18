'use strict';

(function () {

  var MAP_PIN_MAIN_WIDTH = 65;
  var MAP_PIN_MAIN_ROUND_HEIGHT = 65;
  var MAP_PIN_MAIN_HEIGHT = 81; // 65 + 16 = 81, 16 высота указателя

  var MAP_LOCATION_Y_MIN = 49; // 130 - MAP_PIN_MAIN_HEIGHT = 49
  var MAP_LOCATION_Y_MAX = 549; // 630 - MAP_PIN_MAIN_HEIGHT = 549

  var MAP_ADVERT_AMOUNT = 5;

  var mapContainer = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsContainer = document.querySelector('.map .map__pins');
  var mapFiltersContainer = document.querySelector('.map .map__filters-container');

  var closeCardClickHandler = function (card) {
    return function () {
      card.querySelector('.popup__close').removeEventListener('click', closeCardClickHandler(card));
      card.remove();
      removeActivePin();
    };
  };

  var mapKeydownEscHandler = function (evt) {
    window.util.isEscEvent(evt, function () {
      removeCards();
      removeActivePin();
    });
  };

  var removeCards = function () {
    document.removeEventListener('keydown', mapKeydownEscHandler);

    var cards = mapContainer.querySelectorAll('.map__card');
    cards.forEach(function (card) {
      card.querySelector('.popup__close').removeEventListener('click', closeCardClickHandler(card));
      card.remove();
    });
  };

  var showPinDescription = function (advert) {
    removeCards();

    var card = window.card.create(advert);

    document.addEventListener('keydown', mapKeydownEscHandler);
    card.querySelector('.popup__close').addEventListener('click', closeCardClickHandler(card));

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

    if ((button === null) || (button.classList.contains('map__pin--main')) || (button.classList.contains('map__pin--active'))) {
      return;
    }

    var idAdvert = button.getAttribute('data-id');
    var advert = window.main.adverts[idAdvert];

    removeActivePin();

    button.classList.add('map__pin--active');

    showPinDescription(advert);
  });

  window.map = {
    /**
     * Получение границ карты
     * @return {Object} Обхект с описанием границ карты
     */
    getMapBounds: function () {
      return {
        min: new window.Coordinate(-(MAP_PIN_MAIN_WIDTH / 2), MAP_LOCATION_Y_MIN),
        max: new window.Coordinate(parseInt(mapContainer.clientWidth, 10) - (MAP_PIN_MAIN_WIDTH / 2), MAP_LOCATION_Y_MAX)
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
        x += Math.floor(MAP_PIN_MAIN_WIDTH / 2);
        y += Math.floor((MAP_PIN_MAIN_ROUND_HEIGHT) / 2);
      } else {
        // Метка адреса с указателем берется точка на которую указывает маркер
        x += Math.floor(MAP_PIN_MAIN_WIDTH / 2);
        y += Math.floor(MAP_PIN_MAIN_HEIGHT);
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

      for (var i = 0; i < Math.min(adverts.length, MAP_ADVERT_AMOUNT); i++) {
        fragmentPins.appendChild(window.pin.create(adverts[i]));
      }

      mapPinsContainer.appendChild(fragmentPins);
    },

    /**
     * Удаление карточек объявлений и маркеров с карты
     */
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
