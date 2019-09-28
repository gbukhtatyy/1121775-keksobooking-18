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

    /**
     * Получение случайного числа в заданном диапозоне
     *
     * @param {number} max максимальное значение
     * @param {number} min минимальное значение
     * @return {number} случайное значение в заданных диапозонах
     */
    getRandomInt: function (max, min) {
      max = max ? max : 1;
      min = min ? min : 0;

      return Math.floor(Math.random() * Math.floor(max - min)) + min;
    },

    /**
     * Получение случайного элемента из массива
     * @param {Array} array
     * @return {*} случайных элемент массива
     */
    getRandomElementArray: function (array) {
      return array[window.util.getRandomInt(array.length)];
    },

    /**
     * Получение перемешанного массива
     * @param {Array} array исходный массив
     * @return {Array} перемешанный массив
     */
    shuffleArray: function (array) {
      return array.slice(0).sort(function () {
        return Math.random() - 0.5;
      });
    },

    /**
     * Получение amount случайных элементов из массива array
     * @param {Array} array исходный массив
     * @param {number} amount кол-во случайных элементов
     * @return {Array} массив случайных элементов из массива array
     */
    getRandomElementsArray: function (array, amount) {
      return window.util.shuffleArray(array).slice(0, amount);
    }
  };
})();
