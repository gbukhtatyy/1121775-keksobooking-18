'use strict';

(function () {

  var mapContainer = document.querySelector('.map');
  var mapPinMain = document.querySelector('.map__pin--main');

  var startMapPinMainTop = mapPinMain.style.top;
  var startMapPinMainLeft = mapPinMain.style.left;

  var buttonReset = document.querySelector('.ad-form__reset');

  var mapPinMainMousedownHandler = function () {
    activationPage();
  };

  var mapPinMainKeydownEnterHandler = function (evt) {
    window.util.isEnterEvent(evt, activationPage);
  };

  var advertsLoadSuccessHandler = function (response) {
    window.main.adverts = response.slice();

    window.map.showPins(window.main.adverts);
  };

  var advertsLoadErrorHandler = function (message) {
    window.error.show(message);
  };

  var activationPage = function () {
    window.backend.load(advertsLoadSuccessHandler, advertsLoadErrorHandler);

    mapPinMain.removeEventListener('mousedown', mapPinMainMousedownHandler);
    mapPinMain.removeEventListener('keydown', mapPinMainKeydownEnterHandler);

    mapContainer.classList.remove('map--faded');

    // Включение формы объявления
    window.form.active();

    // Включение фильтра на карте
    window.filter.active();
  };

  var deactivationPage = function () {
    mapPinMain.addEventListener('mousedown', mapPinMainMousedownHandler);
    mapPinMain.addEventListener('keydown', mapPinMainKeydownEnterHandler);

    mapContainer.classList.add('map--faded');

    mapPinMain.style.top = startMapPinMainTop;
    mapPinMain.style.left = startMapPinMainLeft;

    window.map.removePins();

    // Отключение формы объявления
    window.form.deactive();

    // Отключение фильтра на карте
    window.filter.deactive();
  };

  buttonReset.addEventListener('click', function () {
    deactivationPage();
  });

  window.util.initializationMove(mapPinMain, mapPinMain, window.map.getMapBounds(), function () {
    window.form.fillAddressField();
  });

  deactivationPage();

  window.main = {
    adverts: [],
    deactive: deactivationPage
  };
})();
