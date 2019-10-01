'use strict';

(function () {
  var mainContainer = document.querySelector('main');
  var template = document.querySelector('#error').content.querySelector('.error');

  window.error = {
    show: function (message) {
      var element = template.cloneNode(true);

      mainContainer.append(element);
    }
  };
})();
