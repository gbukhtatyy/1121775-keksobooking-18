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

  var DEFAULT_URL_SRC = 'img/muffin-grey.svg';

  var form = document.querySelector('.ad-form');
  var fieldTitle = document.querySelector('#title');
  var fieldAddress = document.querySelector('#address');
  var fieldType = document.querySelector('#type');
  var fieldPrice = document.querySelector('#price');
  var fieldCapacity = document.querySelector('#capacity');
  var fieldRoomNumber = document.querySelector('#room_number');
  var fieldTimeIn = document.querySelector('#timein');
  var fieldTimeOut = document.querySelector('#timeout');
  var fieldDescription = document.querySelector('#description');
  var fieldFeatures = document.querySelectorAll('input[name=features]');

  var fieldAvatar = document.querySelector('#avatar');
  var imageAvatar = document.querySelector('.ad-form-header__preview img');

  var fieldImages = document.querySelector('#images');
  var containerImages = document.querySelector('.ad-form__photo');

  var capacityFieldChangeHandler = function () {
    var roomNumber = fieldRoomNumber.value;
    var capacity = fieldCapacity.value * 1;
    var availableValues = ROOM_GUEST_RELATION[roomNumber];
    var message = availableValues.includes(capacity) ? '' : 'Количество гостей не влезут в выбранную комнату';

    fieldCapacity.setCustomValidity(message);
  };

  var timeFieldsChangeHandler = function (evt) {
    if (fieldTimeIn === evt.target) {
      fieldTimeOut.value = fieldTimeIn.value;
    } else {
      fieldTimeIn.value = fieldTimeOut.value;
    }
  };

  var priceFieldChangeHandler = function () {
    var type = fieldType.value;

    var minPrice = TYPE_PRICE_RELATION[type] ? TYPE_PRICE_RELATION[type] : 0;

    fieldPrice.min = minPrice;
    fieldPrice.placeholder = minPrice;
  };

  fieldRoomNumber.addEventListener('change', capacityFieldChangeHandler);
  fieldCapacity.addEventListener('change', capacityFieldChangeHandler);
  fieldTimeIn.addEventListener('change', timeFieldsChangeHandler);
  fieldTimeOut.addEventListener('change', timeFieldsChangeHandler);
  fieldType.addEventListener('change', priceFieldChangeHandler);

  // Выставление стилей для контейнера фотографий
  containerImages.style['background-color'] = 'transparent';
  containerImages.style.display = 'flex';
  containerImages.style.width = '300px';
  containerImages.style['flex-wrap'] = 'wrap';

  window.upload.init(fieldAvatar, imageAvatar);
  window.upload.initWithCallback(fieldImages, function (file) {
    var image = document.createElement('img');

    image.classList.add('ad-form__photo-item');

    image.height = 70;
    image.width = 70;
    image.style['margin-right'] = '5px';
    image.style['margin-bottom'] = '5px';

    image.src = file;

    containerImages.appendChild(image);
  });

  capacityFieldChangeHandler();
  priceFieldChangeHandler(); /**/

  var formSubmitSuccessHandler = function () {
    window.main.deactive();
    window.success.show();
  };

  var formSubmitErrorHandler = function (message) {
    window.error.show(message);
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();

    var data = new FormData(form);

    window.backend.save(data, formSubmitSuccessHandler, formSubmitErrorHandler);
  };

  form.addEventListener('submit', formSubmitHandler);

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

      fieldAddress.value = coordinates.x + ', ' + coordinates.y;
    },

    /**
     * Активация элементов формы фильтра на карте
     */
    active: function () {
      form.classList.remove('ad-form--disabled');

      this.fillAddressField();

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

    /**
     * Сброс значений элементов формы фильтра на карте
     */
    clear: function () {
      fieldTitle.value = '';

      this.fillAddressField();

      fieldType.selectedIndex = DEFAULT_TYPE_SELECTED_INDEX;
      fieldPrice.value = '';
      fieldPrice.min = DEFAULT_PRICE_MIN;
      fieldPrice.placeholder = DEFAULT_PRICE_MIN;

      fieldCapacity.selectedIndex = DEFAULT_CAPACITY_SELECTED_INDEX;
      fieldRoomNumber.selectedIndex = DEFAULT_ROOM_NUMBER_SELECTED_INDEX;

      fieldTimeIn.selectedIndex = 0;
      fieldTimeOut.selectedIndex = 0;

      fieldDescription.value = '';

      fieldAvatar.value = '';
      imageAvatar.src = DEFAULT_URL_SRC;

      fieldImages.value = '';
      containerImages.innerHTML = '';

      fieldFeatures.forEach(function (element) {
        element.checked = false;
      });
    }
  };
})();
