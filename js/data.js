'use strict';

(function () {

  /**
   * Перечень типов объявления
   */
  var ADVERT_OFFER_TYPE = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];

  /**
   * Описание типов объявлений
   */
  var ADVERT_OFFER_TYPE_DESCRIPTION = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  /**
   * Перечень возможного времени выезде и въезда
   */
  var ADVERT_OFFER_TIME = [
    '12:00',
    '13:00',
    '14:00'
  ];

  /**
   * Перечень возможных услуг в объявлении
   */
  var ADVERT_OFFER_FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ];

  /**
   * Перечень возможных фотографиий объявления
   */
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

  var MAP_PIN_MAIN_ROUND_HEIGHT = 65;

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

  window.data = {
    ADVERT_OFFER_TYPE: ADVERT_OFFER_TYPE,
    ADVERT_OFFER_TYPE_DESCRIPTION: ADVERT_OFFER_TYPE_DESCRIPTION,
    ADVERT_OFFER_TIME: ADVERT_OFFER_TIME,
    ADVERT_OFFER_FEATURES: ADVERT_OFFER_FEATURES,
    ADVERT_OFFER_PHOTOS: ADVERT_OFFER_PHOTOS,
    MAP_LOCATION_Y_MIN: MAP_LOCATION_Y_MIN,
    MAP_LOCATION_Y_MAX: MAP_LOCATION_Y_MAX,
    MAP_PIN_WIDTH: MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT: MAP_PIN_HEIGHT,
    MAP_PIN_MAIN_WIDTH: MAP_PIN_MAIN_WIDTH,
    MAP_PIN_MAIN_ROUND_HEIGHT:MAP_PIN_MAIN_ROUND_HEIGHT,
    MAP_PIN_MAIN_HEIGHT: MAP_PIN_MAIN_HEIGHT,
    ADVERT_AMOUNT: ADVERT_AMOUNT,
    ADVERT_PRICE_MIN: ADVERT_PRICE_MIN,
    ADVERT_PRICE_MAX: ADVERT_PRICE_MAX,
    ADVERT_AVATAR_MIN: ADVERT_AVATAR_MIN,
    ADVERT_AVATAR_MAX: ADVERT_AVATAR_MAX,
    ADVERT_ROOMS_MIN: ADVERT_ROOMS_MIN,
    ADVERT_ROOMS_MAX: ADVERT_ROOMS_MAX,
    ADVERT_GUESTS_MIN: ADVERT_GUESTS_MIN,
    ADVERT_GUESTS_MAX: ADVERT_GUESTS_MAX,

    adverts: [],

    generateRandomAdvert: function (maxLocationX) {
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
    },

    syncAdverts: function (mapWidth) {
      this.adverts = [];

      for (var i = 0; i < ADVERT_AMOUNT; i++) {
        this.adverts.push(this.generateRandomAdvert(mapWidth));
      }

      return this.adverts;
    }
  };
})();
