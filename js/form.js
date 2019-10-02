'use strict';

(function () {
  var ROOM_GUEST_RELATION = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var TYPE_PRICE_RELATION = {
    'bungalo': 0,
    'flat': 1000,
    'house': 5000,
    'palace': 10000
  };

  var DEFAULT_TYPE_SELECTED_INDEX = 1;
  var DEFAULT_PRICE_MIN = 1000;

  var DEFAULT_CAPACITY_SELECTED_INDEX = 0;
  var DEFAULT_ROOM_NUMBER_SELECTED_INDEX = 0;

  var form = document.querySelector('.ad-form');

  var fieldTitleElement = document.querySelector('#title');
  var fieldAddressElement = document.querySelector('#address');
  var fieldType = document.querySelector('#type');
  var fieldPrice = document.querySelector('#price');
  var fieldCapacityElement = document.querySelector('#capacity');
  var fieldRoomNumberElement = document.querySelector('#room_number');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var fieldDescription = document.querySelector('#description');
  var fieldFeatures = document.querySelectorAll('input[name=features]');

  var validateCapacityField = function () {
    var roomNumber = fieldRoomNumberElement.value;
    var capacity = fieldCapacityElement.value * 1;
    var availableValues = ROOM_GUEST_RELATION[roomNumber];
    var message = availableValues.includes(capacity) ? '' : 'Количество гостей не влезут в выбранную комнату';

    fieldCapacityElement.setCustomValidity(message);
  };

  var validateTimeFields = function (evt) {
    if (fieldTimeIn === evt.target) {
      fieldTimeOut.value = fieldTimeIn.value;
    } else {
      fieldTimeIn.value = fieldTimeOut.value;
    }
  };

  var validatePriceField = function () {
    var type = fieldType.value;

    var minPrice = TYPE_PRICE_RELATION[type] ? TYPE_PRICE_RELATION[type] : 0;

    fieldPrice.setAttribute('min', minPrice);
    fieldPrice.setAttribute('placeholder', minPrice);
  };

  fieldRoomNumberElement.addEventListener('change', validateCapacityField);
  fieldCapacityElement.addEventListener('change', validateCapacityField);

  fieldType.addEventListener('change', validatePriceField);

  fieldTimeIn.addEventListener('change', validateTimeFields);
  fieldTimeOut.addEventListener('change', validateTimeFields);

  validateCapacityField();
  validatePriceField(); /**/

  window.form = {
    /**
     * Включение/выключение элементов формы
     * @param {Object} element Объект формы в DOM
     * @param {Boolean} isDisabled True или false для выставления в disabled
     */
    changeDisabledFormElements: function (element, isDisabled) {
      var fields = element.querySelectorAll('select, input, textarea, button');

      fields.forEach(function (field) {
        field.disabled = isDisabled;
      });
    },

    fillAddressField: function () {
      var coordinates = window.map.getCoordinatesPinMain();

      fieldAddressElement.value = coordinates.x + ', ' + coordinates.y;
    },

    /**
     * Активация элементов формы фильтра на карте
     */
    active: function () {
      form.classList.remove('ad-form--disabled');

      this.changeDisabledFormElements(form, false);
    },

    /**
     * Диактивация элементов формы фильтра на карте
     */
    deactive: function () {
      this.clear();

      this.changeDisabledFormElements(form, true);

      form.classList.add('ad-form--disabled');
    },

    clear: function () {
      fieldTitleElement.value = '';

      this.fillAddressField();

      fieldType.selectedIndex = DEFAULT_TYPE_SELECTED_INDEX;
      fieldPrice.value = '';
      fieldPrice.min = DEFAULT_PRICE_MIN;
      fieldPrice.placeholder = DEFAULT_PRICE_MIN;

      fieldCapacityElement.selectedIndex = DEFAULT_CAPACITY_SELECTED_INDEX;
      fieldRoomNumberElement.selectedIndex = DEFAULT_ROOM_NUMBER_SELECTED_INDEX;

      fieldTimeIn.selectedIndex = 0;
      fieldTimeOut.selectedIndex = 0;

      fieldDescription.value = '';

      fieldFeatures.forEach(function (element) {
        element.checked = false;
      });
    }
  };
})();
