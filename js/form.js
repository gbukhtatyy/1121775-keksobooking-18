'use strict';

(function () {
  var ROOM_GUEST_RELATION = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var fieldCapacityElement = document.querySelector('#capacity');
  var fieldRoomNumberElement = document.querySelector('#room_number');
  var fieldAddressElement = document.querySelector('#address');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');

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

  fieldRoomNumberElement.addEventListener('change', validateCapacityField);
  fieldCapacityElement.addEventListener('change', validateCapacityField);

  fieldTimeIn.addEventListener('change', validateTimeFields);
  fieldTimeOut.addEventListener('change', validateTimeFields);

  validateCapacityField();

  window.form = {
    changeDisabledFormElements: function (form, isDisabled) {
      var fields = form.querySelectorAll('select, input, textarea, button');

      fields.forEach(function (field) {
        field.disabled = isDisabled;
      });
    },
    fillAddressField: function () {
      var coordinates = window.map.getCoordinatesPinMain();

      fieldAddressElement.value = coordinates.x + ', ' + coordinates.y;
    }
  };
})();
