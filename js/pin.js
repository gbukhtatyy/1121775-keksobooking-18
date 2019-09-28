'use strict';

(function () {
  var templatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var fillElement = function (element, advert) {
    var pinImageElement = element.querySelector('img');

    pinImageElement.alt = advert.offer.title;
    pinImageElement.src = advert.author.avatar;

    element.style.left = (advert.location.x - (window.data.MAP_PIN_WIDTH / 2)) + 'px';
    element.style.top = (advert.location.y - window.data.MAP_PIN_HEIGHT) + 'px';
  };

  var createElement = function (advert) {
    var template = templatePin.cloneNode(true);

    fillElement(template, advert);

    return template;
  };

  window.pin = {
    createElement: createElement
  };
})();
