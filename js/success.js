'use strict';

(function () {

  var container = document.querySelector('main');
  var template = document.querySelector('#success').content.querySelector('.success');
  var popup = false;

  var popupKeydownEscHandler = function (evt) {
    window.util.isEscEvent(evt, function () {
      window.success.close();
    });
  };

  var popupCloseClickHandler = function () {
    window.success.close();
  };

  window.success = {
    show: function () {
      popup = template.cloneNode(true);

      container.append(popup);

      document.addEventListener('keydown', popupKeydownEscHandler);
      popup.addEventListener('click', popupCloseClickHandler);
    },
    close: function () {
      popup.removeEventListener('click', popupKeydownEscHandler);
      document.removeEventListener('keydown', popupCloseClickHandler);

      popup.remove();
    }
  };
})();
