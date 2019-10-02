'use strict';

(function () {
  var mainContainer = document.querySelector('main');
  var template = document.querySelector('#success').content.querySelector('.success');
  var successPopup = false;

  var enterEscSuccessPopupHanlder = function (evt) {
    window.util.isEscEvent(evt, function () {
      window.success.close();
    });
  };

  var clickCloseSuccessPopupHandler = function () {
    window.success.close();
  };

  window.success = {
    show: function () {
      successPopup = template.cloneNode(true);

      mainContainer.append(successPopup);

      document.addEventListener('keydown', enterEscSuccessPopupHanlder);
      successPopup.addEventListener('click', clickCloseSuccessPopupHandler);
    },
    close: function () {
      successPopup.removeEventListener('click', clickCloseSuccessPopupHandler);
      document.removeEventListener('keydown', enterEscSuccessPopupHanlder);

      successPopup.remove();
    }
  };
})();
