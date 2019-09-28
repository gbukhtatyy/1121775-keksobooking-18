'use strict';

var mapContainer = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map .map__filters-container');
var mapPinsContainer = document.querySelector('.map .map__pins');
var mapPinMain = document.querySelector('.map__pin--main');

var formAdElement = document.querySelector('.ad-form');
var formMapFiltersElement = document.querySelector('.map__filters');

var mapWidth = mapContainer.clientWidth;
var adverts = window.data.syncAdverts(mapWidth);

var fillPinElement = function (element, advert) {
  var pinImageElement = element.querySelector('img');

  pinImageElement.alt = advert.offer.title;
  pinImageElement.src = advert.author.avatar;

  element.style.left = (advert.location.x - (window.data.MAP_PIN_WIDTH / 2)) + 'px';
  element.style.top = (advert.location.y - window.data.MAP_PIN_HEIGHT) + 'px';
};

var createPinElement = function (advert) {
  var template = document.querySelector('#pin')
    .content
    .querySelector('.map__pin')
    .cloneNode(true);

  fillPinElement(template, advert);

  return template;
};

var fillAdvertFeatures = function (element, advert) {
  var featuresElement = element.querySelector('.popup__features');
  var featuresContent = '';
  advert.offer.features.forEach(function (feature) {
    featuresContent += '<li class="popup__feature popup__feature--' + feature + '"></li>';
  });
  featuresElement.innerHTML = featuresContent;
};

var fillAdvertPhotos = function (element, advert) {
  var photosElement = element.querySelector('.popup__photos');
  var photosContent = '';
  advert.offer.photos.forEach(function (photo) {
    photosContent += '<img src="' + photo + '" class="popup__photo" width="45" height="40" alt="' + advert.offer.title + '"></li>';
  });
  photosElement.innerHTML = photosContent;
};

var fillPinDescriptionElement = function (element, advert) {
  element.querySelector('.popup__avatar').src = advert.author.avatar;
  element.querySelector('.popup__title').textContent = advert.offer.title;
  element.querySelector('.popup__text--address').textContent = advert.offer.address;
  element.querySelector('.popup__text--price').textContent = advert.offer.price + '₽/ночь';
  element.querySelector('.popup__type').textContent = window.data.ADVERT_OFFER_TYPE_DESCRIPTION[advert.offer.type];
  element.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
  element.querySelector('.popup__description ').textContent = advert.offer.description;

  fillAdvertFeatures(element, advert);
  fillAdvertPhotos(element, advert);
};

var createPinDescriptionElement = function (advert) {
  var template = document.querySelector('#card')
    .content
    .querySelector('article')
    .cloneNode(true);

  fillPinDescriptionElement(template, advert);

  return template;
};

var showMapPins = function () {
  var fragmentPins = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragmentPins.appendChild(createPinElement(adverts[i]));
  }

  mapPinsContainer.appendChild(fragmentPins);
};

var showMapDescriptions = function () {
  var fragmentDescriptions = document.createDocumentFragment();

  for (var i = 0; i < adverts.length; i++) {
    fragmentDescriptions.appendChild(createPinDescriptionElement(adverts[i]));
  }

  mapFiltersContainer.before(fragmentDescriptions);
};

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
  showMapPins();
};

var deactivationPage = function () {
  mapPinMain.addEventListener('mousedown', mousedownMapPinMainHandler);
  mapPinMain.addEventListener('keydown', keydownEnterMapPinMainHandler);

  window.form.changeDisabledFormElements(formAdElement, true);
  window.form.changeDisabledFormElements(formMapFiltersElement, true);

  mapContainer.classList.add('map--faded');
  formAdElement.classList.add('ad-form--disabled');
};

deactivationPage();
