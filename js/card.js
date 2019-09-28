'use strict';

(function () {
  /**
   * Шаблон отображения карточки объявления
   */
  var templatePinDescription = document.querySelector('#card').content.querySelector('article');

  /**
   * Заполнение тэгов объявления
   * @param {Object} element элемент разметки
   * @param {Object} advert объект объявления
   */
  var fillAdvertFeatures = function (element, advert) {
    var featuresElement = element.querySelector('.popup__features');
    var featuresContent = '';
    advert.offer.features.forEach(function (feature) {
      featuresContent += '<li class="popup__feature popup__feature--' + feature + '"></li>';
    });
    featuresElement.innerHTML = featuresContent;
  };

  /**
   * Заполнение фотографий объявления
   * @param {Object} element элемент разметки
   * @param {Object} advert объект объявления
   */
  var fillAdvertPhotos = function (element, advert) {
    var photosElement = element.querySelector('.popup__photos');
    var photosContent = '';
    advert.offer.photos.forEach(function (photo) {
      photosContent += '<img src="' + photo + '" class="popup__photo" width="45" height="40" alt="' + advert.offer.title + '"></li>';
    });
    photosElement.innerHTML = photosContent;
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
    element.querySelector('.popup__type').textContent = window.data.ADVERT_OFFER_TYPE_DESCRIPTION[advert.offer.type];
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
    createElement: function (advert) {
      var template = templatePinDescription.cloneNode(true);

      fillPinDescriptionElement(template, advert);

      return template;
    }
  };
})();
