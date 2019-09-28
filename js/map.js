'use strict';

(function () {
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinsContainer = document.querySelector('.map .map__pins');
  var mapFiltersContainer = document.querySelector('.map .map__filters-container');
  var templatePinDescription = document.querySelector('#card').content.querySelector('article');

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
    var template = templatePinDescription.cloneNode(true);

    fillPinDescriptionElement(template, advert);

    return template;
  };

  window.map = {
    getCoordinatesPinMain: function () {
      var x = Math.floor(parseInt(mapPinMain.style.left, 10) + window.data.MAP_PIN_MAIN_WIDTH / 2);
      var y = Math.floor(parseInt(mapPinMain.style.top, 10) + window.data.MAP_PIN_MAIN_HEIGHT);
      return {
        x: x,
        y: y
      };
    },
    showPins: function (adverts) {
      var fragmentPins = document.createDocumentFragment();

      for (var i = 0; i < adverts.length; i++) {
        fragmentPins.appendChild(window.pin.createElement(adverts[i]));
      }

      mapPinsContainer.appendChild(fragmentPins);
    },
    showMapDescriptions: function (adverts) {
      var fragmentDescriptions = document.createDocumentFragment();

      for (var i = 0; i < adverts.length; i++) {
        fragmentDescriptions.appendChild(createPinDescriptionElement(adverts[i]));
      }

      mapFiltersContainer.before(fragmentDescriptions);
    }
  };
})();
