'use strict';

(function () {

  var form = document.querySelector('.map__filters');
  var selectFields = form.querySelectorAll('select');
  var checkboxFields = form.querySelectorAll('input[type=checkbox]');

  window.filter = {
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
    }
  };
})();
