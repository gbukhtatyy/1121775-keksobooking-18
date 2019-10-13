'use strict';

(function () {

  // Описание типов объявлений
  var ADVERT_OFFER_TYPE_DESCRIPTION = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var PHOTO_WITH = 45;
  var PHOTO_HEIGHT = 40;

  // Шаблон отображения карточки объявления
  var template = document.querySelector('#card').content.querySelector('article');

  var templateFeature = document.createElement('li');
  templateFeature.className = 'popup__feature';

  var templatePhoto = document.createElement('img');
  templatePhoto.className = 'popup__photo';
  templatePhoto.width = PHOTO_WITH;
  templatePhoto.height = PHOTO_HEIGHT;

  /**
   * Заполнение тэгов объявления
   * @param {Object} element элемент разметки
   * @param {Object} advert объект объявления
   */
  var fillAdvertFeatures = function (element, advert) {
    var features = element.querySelector('.popup__features');
    var featuresContent = document.createDocumentFragment();

    features.innerHTML = '';

    advert.offer.features.forEach(function (feature) {
      var item = templateFeature.cloneNode(true);
      item.classList.add('popup__feature--' + feature);
      featuresContent.appendChild(item);
    });

    features.appendChild(featuresContent);
  };

  /**
   * Заполнение фотографий объявления
   * @param {Object} element элемент разметки
   * @param {Object} advert объект объявления
   */
  var fillAdvertPhotos = function (element, advert) {
    var photos = element.querySelector('.popup__photos');
    var photosContent = document.createDocumentFragment();

    photos.innerHTML = '';

    advert.offer.photos.forEach(function (photo) {
      var item = templatePhoto.cloneNode(true);

      item.src = photo;
      item.alt = advert.offer.title;

      photosContent.appendChild(item);
    });
    photos.appendChild(photosContent);
  };

  /**
   * Заполение шаблона карточки объявления данными
   * @param {Object} element элемент разметки
   * @param {Object} advert объект объявления
   */
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

  window.card = {
    /**
     * Создание разметки карточки объявления для отображения подробной информации
     * @param {Object} advert объект объявления
     * @return {Object} разметка картоки объявления
     */
    create: function (advert) {
      var card = template.cloneNode(true);

      fillPinDescriptionElement(card, advert);

      return card;
    }
  };
})();
