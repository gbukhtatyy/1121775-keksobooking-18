'use strict';

(function () {
  var XHR_STATUS_SUCCESS = 200;
  var XHR_TIMEOUT = 1000;

  var LOAD_METHOD = 'GET';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';

  var sendXMLHttpRequest = function (url, method, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS_SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(method, url);

    var params = data ? data : new FormData();

    xhr.send(params);
  };

  window.backend = {
    load: function (onLoad, onError) {
      sendXMLHttpRequest(LOAD_URL, LOAD_METHOD, false, onLoad, onError);
    },
  };
})();
