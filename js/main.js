'use strict';

var mapContainer = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');

var startMapPinMainTop = mapPinMain.style.top;
var startMapPinMainLeft = mapPinMain.style.left;

var formAdElement = document.querySelector('.ad-form');
var formMapFiltersElement = document.querySelector('.map__filters');
var formResetElement = document.querySelector('.ad-form__reset');

var mapWidth = mapContainer.clientWidth;
var adverts = window.data.syncAdverts(mapWidth);

var mousedownMapPinMainHandler = function () {
  activationPage();
};

var keydownEnterMapPinMainHandler = function (evt) {
  window.util.isEnterEvent(evt, activationPage);
};

var activationPage = function () {
  mapPinMain.removeEventListener('mousedown', mousedownMapPinMainHandler);
  mapPinMain.removeEventListener('keydown', keydownEnterMapPinMainHandler);

  mapContainer.classList.remove('map--faded');

  window.form.fillAddressField();
  window.map.showPins(adverts);

  // Включение формы объявления
  window.form.active();

  // Включение фильтра на карте
  window.filter.active();
};

var deactivationPage = function () {
  mapPinMain.addEventListener('mousedown', mousedownMapPinMainHandler);
  mapPinMain.addEventListener('keydown', keydownEnterMapPinMainHandler);

  window.form.changeDisabledFormElements(formAdElement, true);

  mapContainer.classList.add('map--faded');

  mapPinMain.style.top = startMapPinMainTop;
  mapPinMain.style.left = startMapPinMainLeft;

  window.map.removePins();

  window.form.clear();
  window.form.fillAddressField();

  // Отключение формы объявления
  window.form.deactive();

  // Отключение фильтра на карте
  window.filter.deactive();
};

formResetElement.addEventListener('click', function () {
  deactivationPage();
});

window.util.initializationMove(mapPinMain, mapPinMain, window.map.getMapBounds(), function () {
  window.form.fillAddressField();
});

deactivationPage();
