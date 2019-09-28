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

  var validateCapacityField = function () {
    var roomNumber = fieldRoomNumberElement.value;
    var capacity = fieldCapacityElement.value * 1;
    var availableValues = ROOM_GUEST_RELATION[roomNumber];
    var message = availableValues.includes(capacity) ? '' : 'Количество гостей не влезут в выбранную комнату';

    fieldCapacityElement.setCustomValidity(message);
  };

  fieldRoomNumberElement.addEventListener('change', function () {
    validateCapacityField();
  });

  fieldCapacityElement.addEventListener('change', function () {
    validateCapacityField();
  });

  validateCapacityField();
})();
