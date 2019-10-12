'use strict';

(function () {

  var form = document.querySelector('.map__filters');
  var selectFields = form.querySelectorAll('select');
  var checkboxFields = form.querySelectorAll('input[type=checkbox]');

  var fieldHousingType = document.querySelector('#housing-type');
  var fieldHousingPrice = document.querySelector('#housing-price');
  var fieldHousingRooms = document.querySelector('#housing-rooms');
  var fieldHousingGuests = document.querySelector('#housing-guests');
  var fieldFeatures = document.querySelector('#housing-features');

  var saveFilterValues = function () {
    window.filter.fields.type = fieldHousingType.value;
    window.filter.fields.price = fieldHousingPrice.value;
    window.filter.fields.rooms = fieldHousingRooms.value;
    window.filter.fields.guests = fieldHousingGuests.value;
    window.filter.fields.features = [].map.call(fieldFeatures.querySelectorAll('[name=features]:checked'), function (element) {
      return element.value;
    });
  };

  fieldHousingType.addEventListener('change', saveFilterValues);
  fieldHousingPrice.addEventListener('change', saveFilterValues);
  fieldHousingRooms.addEventListener('change', saveFilterValues);
  fieldHousingGuests.addEventListener('change', saveFilterValues);
  [].map.call(fieldFeatures.querySelectorAll('[name=features]'), function (element) {
    element.addEventListener('change', saveFilterValues);
  });

  window.filter = {
    fields: {
      type: false,
      price: false,
      rooms: false,
      guests: false,
      features: false
    },
    /**
     * Активация элементов формы фильтра на карте
     */
    active: function () {
      window.form.changeDisabledFormElements(form, false);
    },

    /**
     * Диактивация элементов формы фильтра на карте
     */
    deactive: function () {
      this.clear();

      window.form.changeDisabledFormElements(form, true);
    },

    /**
     * Сброс значений элементов формы фильтра на карте
     */
    clear: function () {
      selectFields.forEach(function (field) {
        field.selectedIndex = 0;
      });

      checkboxFields.forEach(function (field) {
        field.checked = false;
      });

      saveFilterValues();
    }
  };
})();
