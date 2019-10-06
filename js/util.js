'use strict';

(function () {

  var KEY_CODE_ESC = 27;
  var KEY_CODE_ENTER = 13;

  window.util = {
    /**
     * Выполение функции при нажатой клавиши ESC
     *
     * @param {Object} evt объект события
     * @param {*} action функция для выполнения
     */
    isEscEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ESC) {
        action();
      }
    },

    /**
     * Выполение функции при нажатой клавиши Enter
     *
     * @param {Object} evt объект события
     * @param {*} action функция для выполнения
     */
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === KEY_CODE_ENTER) {
        action();
      }
    },

    initializationMove: function (element, elementTrigger, bounds, elementMoveHandler) {
      var minX = false;
      var maxX = false;
      var minY = false;
      var maxY = false;

      if (bounds.x) {
        minX = bounds.x.min;
        maxX = bounds.x.max;
      }
      if (bounds.y) {
        minY = bounds.y.min;
        maxY = bounds.y.max;
      }

      elementTrigger.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = {
          x: evt.clientX,
          y: evt.clientY
        };

        var dragged = false;

        var mouseMoveHandler = function (moveEvt) {
          moveEvt.preventDefault();
          dragged = true;

          var shift = {
            x: startCoords.x - moveEvt.clientX,
            y: startCoords.y - moveEvt.clientY
          };

          startCoords = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
          };

          shift.y = element.offsetTop - shift.y;
          shift.x = element.offsetLeft - shift.x;

          shift.x = minX !== false && shift.x < minX ? minX : shift.x;
          shift.x = maxX !== false && shift.x > maxX ? maxX : shift.x;
          shift.y = minY !== false && shift.y < minY ? minY : shift.y;
          shift.y = maxY !== false && shift.y > maxY ? maxY : shift.y;

          element.style.top = shift.y + 'px';
          element.style.left = shift.x + 'px';

          if (elementMoveHandler) {
            elementMoveHandler();
          }
        };

        var mouseUpHandler = function (upEvt) {
          upEvt.preventDefault();

          document.removeEventListener('mousemove', mouseMoveHandler);
          document.removeEventListener('mouseup', mouseUpHandler);

          if (dragged) {
            var clickPreventDefaultHandler = function (clickEvt) {
              clickEvt.preventDefault();
              element.removeEventListener('click', clickPreventDefaultHandler);
            };
            element.addEventListener('click', clickPreventDefaultHandler);
          }

          if (elementMoveHandler) {
            elementMoveHandler();
          }
        };

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
      });
    }
  };
})();
