'use strict';

(function () {

  var XHR_STATUS_SUCCESS = 200;
  var XHR_TIMEOUT = 1000;

  var LOAD_METHOD = 'GET';
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';

  var SAVE_METHOD = 'POST';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';

  /**
   * Выполнение запроса к серверу
   * @param {String} url
   * @param {String} method
   * @param {FormData} data
   * @param {Function} onLoad
   * @param {Function} onError
   */
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
    /**
     * Получение меток похожих объявлений
     * @param {Function} onLoad
     * @param {Function} onError
     */
    load: function (onLoad, onError) {
      sendXMLHttpRequest(LOAD_URL, LOAD_METHOD, false, onLoad, onError);
    },

    /**
     * Сохранение объявления
     * @param {FormData} data
     * @param {Function} onLoad
     * @param {Function} onError
     */
    save: function (data, onLoad, onError) {
      sendXMLHttpRequest(SAVE_URL, SAVE_METHOD, data, onLoad, onError);
    },
  };
})();
