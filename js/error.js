'use strict';

(function () {
  var mainContainer = document.querySelector('main');
  var template = document.querySelector('#error').content.querySelector('.error');
  var errorPopup = false;

  var enterEscErrorPopupHanlder = function (evt) {
    window.util.isEscEvent(evt, function () {
      window.error.close();
    });
  };

  var clickCloseErrorPopupHandler = function () {
    window.error.close();
  };

  window.error = {
    show: function (message) {
      errorPopup = template.cloneNode(true);

      errorPopup.querySelector('.error__message').textContent = message;

      mainContainer.append(errorPopup);

      errorPopup.querySelector('.error__button').addEventListener('click', clickCloseErrorPopupHandler);
      document.addEventListener('keydown', enterEscErrorPopupHanlder);
      errorPopup.addEventListener('click', clickCloseErrorPopupHandler);
    },
    close: function () {
      errorPopup.addEventListener('click', clickCloseErrorPopupHandler);
      document.removeEventListener('keydown', enterEscErrorPopupHanlder);
      errorPopup.querySelector('.error__button').removeEventListener('click', clickCloseErrorPopupHandler);

      errorPopup.remove();
    }
  };
})();
