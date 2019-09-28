'use strict';

var ADVERT_OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var ADVERT_OFFER_TYPE_DESCRIPTION = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var ADVERT_OFFER_TIME = [
  '12:00',
  '13:00',
  '14:00'
];

var ADVERT_OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var ADVERT_OFFER_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var MAP_LOCATION_Y_MIN = 130;
var MAP_LOCATION_Y_MAX = 630;

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var MAP_PIN_MAIN_WIDTH = 65;
var MAP_PIN_MAIN_HEIGHT = 65 + 22;

var ADVERT_AMOUNT = 8;

var ADVERT_PRICE_MIN = 1000;
var ADVERT_PRICE_MAX = 5000;

var ADVERT_AVATAR_MIN = 1;
var ADVERT_AVATAR_MAX = 8;

var ADVERT_ROOMS_MIN = 1;
var ADVERT_ROOMS_MAX = 5;

var ADVERT_GUESTS_MIN = 1;
var ADVERT_GUESTS_MAX = 8;


var mapContainer = document.querySelector('.map');
var mapFiltersContainer = document.querySelector('.map .map__filters-container');
var mapPinsContainer = document.querySelector('.map .map__pins');
var mapPinMain = document.querySelector('.map__pin--main');

var formAdElement = document.querySelector('.ad-form');
var formMapFiltersElement = document.querySelector('.map__filters');

var fieldAddressElement = document.querySelector('#address');

var mapWidth = mapContainer.clientWidth;
var adverts = [];

var generateRandomAdvert = function (maxLocationX) {
  var locationX = window.util.getRandomInt(maxLocationX - 2 * MAP_PIN_WIDTH, MAP_PIN_WIDTH);
  var locationY = window.util.getRandomInt(MAP_LOCATION_Y_MAX, MAP_LOCATION_Y_MIN);

  var avatarNumber = window.util.getRandomInt(ADVERT_AVATAR_MAX, ADVERT_AVATAR_MIN);

  return {
    'author': {
      'avatar': 'img/avatars/user0' + avatarNumber + '.png'
    },
    'offer': {
      'title': 'заголовок предложения',
      'address': locationX + ', ' + locationY,
      'price': window.util.getRandomInt(ADVERT_PRICE_MAX, ADVERT_PRICE_MIN),
      'type': window.util.getRandomElementArray(ADVERT_OFFER_TYPE),
      'rooms': window.util.getRandomInt(ADVERT_ROOMS_MAX, ADVERT_ROOMS_MIN),
      'guests': window.util.getRandomInt(ADVERT_GUESTS_MAX, ADVERT_GUESTS_MIN),
      'checkin': window.util.getRandomElementArray(ADVERT_OFFER_TIME),
      'checkout': window.util.getRandomElementArray(ADVERT_OFFER_TIME),
      'features': window.util.getRandomElementsArray(ADVERT_OFFER_FEATURES, window.util.getRandomInt(ADVERT_OFFER_FEATURES.length, 1)),
      'description': 'строка с описанием',
      'photos': window.util.getRandomElementsArray(ADVERT_OFFER_PHOTOS, window.util.getRandomInt(ADVERT_OFFER_PHOTOS.length, 1)),
    },
    'location': {
      'x': locationX,
      'y': locationY
    }
  };
};

var fillPinElement = function (element, advert) {
  var pinImageElement = element.querySelector('img');

  pinImageElement.alt = advert.offer.title;
  pinImageElement.src = advert.author.avatar;

  element.style.left = (advert.location.x - (MAP_PIN_WIDTH / 2)) + 'px';
  element.style.top = (advert.location.y - MAP_PIN_HEIGHT) + 'px';
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
  element.querySelector('.popup__type').textContent = ADVERT_OFFER_TYPE_DESCRIPTION[advert.offer.type];
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

var syncAdverts = function () {
  adverts = [];
  for (var i = 0; i < ADVERT_AMOUNT; i++) {
    adverts.push(generateRandomAdvert(mapWidth));
  }
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

var changeDisabledFormElements = function (form, isDisabled) {
  var fields = form.querySelectorAll('select, input, textarea, button');

  fields.forEach(function (field) {
    field.disabled = isDisabled;
  });
};

var getCoordinatesPinMain = function () {
  var x = Math.floor(mapPinMain.style.left.slice(0, -2) * 1 + MAP_PIN_MAIN_WIDTH / 2);
  var y = Math.floor(mapPinMain.style.top.slice(0, -2) * 1 + MAP_PIN_MAIN_HEIGHT);
  return {
    x: x,
    y: y
  };
};

var mousedownMapPinMainHandler = function () {
  activationPage();
};

var keydownEnterMapPinMainHandler = function (evt) {
  window.util.isEnterEvent(evt, activationPage);
};

var fillAddressField = function () {
  var coordinates = getCoordinatesPinMain();

  fieldAddressElement.value = coordinates.x + ', ' + coordinates.y;
};

var activationPage = function () {
  mapPinMain.removeEventListener('mousedown', mousedownMapPinMainHandler);
  mapPinMain.removeEventListener('keydown', keydownEnterMapPinMainHandler);

  changeDisabledFormElements(formAdElement, false);
  changeDisabledFormElements(formMapFiltersElement, false);

  mapContainer.classList.remove('map--faded');
  formAdElement.classList.remove('ad-form--disabled');

  fillAddressField();
  showMapPins();
};

var deactivationPage = function () {
  mapPinMain.addEventListener('mousedown', mousedownMapPinMainHandler);
  mapPinMain.addEventListener('keydown', keydownEnterMapPinMainHandler);

  changeDisabledFormElements(formAdElement, true);
  changeDisabledFormElements(formMapFiltersElement, true);

  mapContainer.classList.add('map--faded');
  formAdElement.classList.add('ad-form--disabled');
};

syncAdverts();
deactivationPage();
