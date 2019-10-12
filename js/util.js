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
      var minCoordinate = bounds.min;
      var maxCoordinate = bounds.max;

      elementTrigger.addEventListener('mousedown', function (evt) {
        evt.preventDefault();

        var startCoords = new window.Coordinate(evt.clientX, evt.clientY);

        var dragged = false;

        var mouseMoveHandler = function (moveEvt) {
          moveEvt.preventDefault();
          dragged = true;

          var shiftCoordinate = new window.Coordinate(startCoords.x, startCoords.y);
          shiftCoordinate.sub(new window.Coordinate(moveEvt.clientX, moveEvt.clientY));

          startCoords = new window.Coordinate(moveEvt.clientX, moveEvt.clientY);

          var offsetCoordinate = new window.Coordinate(element.offsetLeft, element.offsetTop);

          offsetCoordinate.sub(shiftCoordinate);

          offsetCoordinate.x = minCoordinate.x !== false && offsetCoordinate.x < minCoordinate.x ? minCoordinate.x : offsetCoordinate.x;
          offsetCoordinate.x = maxCoordinate.x !== false && offsetCoordinate.x > maxCoordinate.x ? maxCoordinate.x : offsetCoordinate.x;
          offsetCoordinate.y = minCoordinate.y !== false && offsetCoordinate.y < minCoordinate.y ? minCoordinate.y : offsetCoordinate.y;
          offsetCoordinate.y = maxCoordinate.y !== false && offsetCoordinate.y > maxCoordinate.y ? maxCoordinate.y : offsetCoordinate.y;

          element.style.top = offsetCoordinate.y + 'px';
          element.style.left = offsetCoordinate.x + 'px';

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
