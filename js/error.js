'use strict';

(function () {
  var container = document.querySelector('main');
  var template = document.querySelector('#error').content.querySelector('.error');
  var popup = false;

  var popupKeydownEscHandler = function (evt) {
    window.util.isEscEvent(evt, function () {
      window.error.close();
    });
  };

  var popupCloseClickHandler = function () {
    window.error.close();
  };

  window.error = {
    show: function (message) {
      popup = template.cloneNode(true);

      popup.querySelector('.error__message').textContent = message;

      container.append(popup);

      popup.querySelector('.error__button').addEventListener('click', popupCloseClickHandler);
      document.addEventListener('keydown', popupKeydownEscHandler);
      popup.addEventListener('click', popupCloseClickHandler);
    },
    close: function () {
      popup.addEventListener('click', popupCloseClickHandler);
      document.removeEventListener('keydown', popupKeydownEscHandler);
      popup.querySelector('.error__button').removeEventListener('click', popupCloseClickHandler);

      popup.remove();
    }
  };
})();
