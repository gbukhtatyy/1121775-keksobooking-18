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

  window.form.changeDisabledFormElements(formAdElement, false);
  window.form.changeDisabledFormElements(formMapFiltersElement, false);

  mapContainer.classList.remove('map--faded');
  formAdElement.classList.remove('ad-form--disabled');

  window.form.fillAddressField();
  window.map.showPins(adverts);
};

var deactivationPage = function () {
  mapPinMain.addEventListener('mousedown', mousedownMapPinMainHandler);
  mapPinMain.addEventListener('keydown', keydownEnterMapPinMainHandler);

  window.form.changeDisabledFormElements(formAdElement, true);
  window.form.changeDisabledFormElements(formMapFiltersElement, true);

  mapContainer.classList.add('map--faded');
  formAdElement.classList.add('ad-form--disabled');

  mapPinMain.style.top = startMapPinMainTop;
  mapPinMain.style.left = startMapPinMainLeft;

  window.map.removePins();
  window.form.clear();
  window.form.fillAddressField();
};

formResetElement.addEventListener('click', function () {
  deactivationPage();
});

window.util.initializationMove(mapPinMain, mapPinMain, window.map.getMapBounds(), function () {
  window.form.fillAddressField();
});

deactivationPage();
