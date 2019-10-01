'use strict';

(function () {
  var mainContainer = document.querySelector('main');
  var template = document.querySelector('#error').content.querySelector('.error');

  window.error = {
    show: function (message) {
      var element = template.cloneNode(true);
      element.querySelector('.error__message').innerHTML = message;
      mainContainer.append(element);
    }
  };
})();
