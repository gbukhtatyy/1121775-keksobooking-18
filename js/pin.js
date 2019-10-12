'use strict';

(function () {

  var MAP_PIN_WIDTH = 50;
  var MAP_PIN_HEIGHT = 70;

  var template = document.querySelector('#pin').content.querySelector('.map__pin');

  /**
   * Заполение шаблона маркера объявления данными
   * @param {Object} pin элемент разметки маркера на карте
   * @param {Object} advert объект объявления
   */
  var fillPin = function (pin, advert) {
    var pinImage = pin.querySelector('img');

    pinImage.alt = advert.offer.title;
    pinImage.src = advert.author.avatar;

    pin.style.left = (advert.location.x - (MAP_PIN_WIDTH / 2)) + 'px';
    pin.style.top = (advert.location.y - MAP_PIN_HEIGHT) + 'px';
  };

  window.pin = {
    /**
     * Создание разметки маркера объявления для отображения на карте
     * @param {Object} advert объект объявления
     * @return {Object} разметка маркера объявления
     */
    create: function (advert) {
      var pin = template.cloneNode(true);

      pin.setAttribute('data-id', advert.id);

      fillPin(pin, advert);

      return pin;
    }
  };
})();
