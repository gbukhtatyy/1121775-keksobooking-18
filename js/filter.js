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

  var fieldChangeHadnler = function () {
    saveFilterValues();

    window.main.renderMapPins();
  };

  fieldHousingType.addEventListener('change', fieldChangeHadnler);
  fieldHousingPrice.addEventListener('change', fieldChangeHadnler);
  fieldHousingRooms.addEventListener('change', fieldChangeHadnler);
  fieldHousingGuests.addEventListener('change', fieldChangeHadnler);
  [].map.call(fieldFeatures.querySelectorAll('[name=features]'), function (element) {
    element.addEventListener('change', fieldChangeHadnler);
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
     * Применение фильтраций к объявлениям
     * @param {Array} adverts список объявлений
     * @return {Array} список обхявлений удовлетворяющим фильтрам
     */
    apply: function (adverts) {
      var fields = window.filter.fields;

      return adverts.filter(function (advert) {
        if (fields.type !== 'any' && advert.offer.type !== fields.type) {
          return false;
        }

        return true;
      });
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
