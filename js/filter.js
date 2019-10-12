'use strict';

(function () {
  var ADVERT_LOW_PRICE = 10000;
  var ADVERT_HIGH_PRICE = 50000;

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

  var fieldChangeHadnler = window.debounce(function () {
    saveFilterValues();

    window.main.renderMapPins();
  });

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

      var minPrice = false;
      var maxPrice = false;

      if (fields.price !== 'any') {
        switch (fields.price) {
          case 'low':
            maxPrice = ADVERT_LOW_PRICE;
            break;
          case 'middle':
            minPrice = ADVERT_LOW_PRICE;
            maxPrice = ADVERT_HIGH_PRICE;
            break;
          case 'high':
            minPrice = ADVERT_HIGH_PRICE;
            break;
        }
      }

      return adverts.filter(function (advert) {
        var rooms = advert.offer.rooms + '';
        var guests = advert.offer.guests + '';

        var advertFeatures = advert.offer.features.filter(function (feature) {
          return fields.features.indexOf(feature) !== -1;
        });

        if (fields.type !== 'any' && advert.offer.type !== fields.type) {
          return false;
        }

        if (fields.rooms !== 'any' && rooms !== fields.rooms) {
          return false;
        }

        if (fields.guests !== 'any' && guests !== fields.guests) {
          return false;
        }

        if (maxPrice && advert.offer.price > maxPrice) {
          return false;
        }

        if (minPrice && advert.offer.price < minPrice) {
          return false;
        }

        if (fields.features.length > 0 && advertFeatures.length !== fields.features.length) {
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
