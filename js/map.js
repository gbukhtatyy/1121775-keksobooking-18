'use strict';

(function () {
  var mapContainer = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsContainer = document.querySelector('.map .map__pins');
  var mapFiltersContainer = document.querySelector('.map .map__filters-container');

  var removeCards = function () {
    var cards = mapContainer.querySelectorAll('.map__card');
    cards.forEach(function (card) {
      card.remove();
    });
  };

  mapContainer.addEventListener('keydown', function (evt) {
    window.util.isEscEvent(evt, removeCards);
  });

  var showPinDescription = function (advert) {
    removeCards();

    var card = window.card.createElement(advert);

    card.querySelector('.popup__close').addEventListener('click', function () {
      card.remove();
    });

    mapFiltersContainer.before(card);
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

    showPinDescription(advert);
  });

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
        fragmentPins.appendChild(window.pin.createElement(adverts[i], i));
      }

      mapPinsContainer.appendChild(fragmentPins);
    },

    /**
     * Отображение карточек объявлений на карте
     * @param {Array} adverts массив объявлений для отображения
     */
    showMapDescription: function (adverts) {
      var fragmentDescriptions = document.createDocumentFragment();

      for (var i = 0; i < adverts.length; i++) {
        fragmentDescriptions.appendChild(window.card.createElement(adverts[i]));
      }

      mapFiltersContainer.before(fragmentDescriptions);
    }
  };
})();
