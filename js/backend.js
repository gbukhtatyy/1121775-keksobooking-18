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
   * @param {Function} loadHandler
   * @param {Function} errorHandler
   */
  var sendXMLHttpRequest = function (url, method, data, loadHandler, errorHandler) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_STATUS_SUCCESS) {
        loadHandler(xhr.response);
      } else {
        errorHandler('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      errorHandler('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      errorHandler('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = XHR_TIMEOUT;

    xhr.open(method, url);

    var params = data ? data : new FormData();

    xhr.send(params);
  };

  window.backend = {
    /**
     * Получение меток похожих объявлений
     * @param {Function} loadHandler
     * @param {Function} errorHandler
     */
    load: function (loadHandler, errorHandler) {
      sendXMLHttpRequest(LOAD_URL, LOAD_METHOD, false, loadHandler, errorHandler);
    },

    /**
     * Сохранение объявления
     * @param {FormData} data
     * @param {Function} loadHandler
     * @param {Function} errorHandler
     */
    save: function (data, loadHandler, errorHandler) {
      sendXMLHttpRequest(SAVE_URL, SAVE_METHOD, data, loadHandler, errorHandler);
    },
  };
})();
