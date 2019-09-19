var ADVERT_OFFER_TYPE = [
  "palace",
  "flat",
  "house",
  "bungalo"
];

var ADVERT_OFFER_TIME = [
  "12:00",
  "13:00",
  "14:00"
];

var ADVERT_OFFER_FEATURES = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
];

var ADVERT_OFFER_PHOTOS = [
  "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel2.jpg",
  "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
];

var MAP_LOCATION_Y_MIN = 130;

var MAP_LOCATION_Y_MAX = 630;

var MAP_PIN_WIDTH = 50;
var MAP_PIN_HEIGHT = 70;

var ADVERT_AMOUNT = 8;

var getRandomInt = function (max, min = 0) {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
};

var getRandomElementArray = function (array) {
  return array[getRandomInt(array.length)];
};

var shuffleArray = function (array) {
  return array.slice(0).sort(function () {
    return Math.random() - 0.5;
  });
}

var getRandomElementsArray = function (array, amount) {
  return shuffleArray(array).slice(0, amount);
}

var generateRandomAdvert = function (max_location_x) {
  var location_x = getRandomInt(max_location_x - 2 * MAP_PIN_WIDTH, MAP_PIN_WIDTH);
  var location_y = getRandomInt(MAP_LOCATION_Y_MAX, MAP_LOCATION_Y_MIN);

  var avatar_number = getRandomInt(8, 1);

  return {
    author: {
      avatar: "img/avatars/user0" + avatar_number + ".png"
    },
    "offer": {
      "title": "заголовок предложения",
      "address": location_x + ", " + location_y,
      "price": getRandomInt(5000, 1000),
      "type": getRandomElementArray(ADVERT_OFFER_TYPE),
      "rooms": getRandomInt(5, 1),
      "guests": getRandomInt(8, 1),
      "checkin": getRandomElementArray(ADVERT_OFFER_TIME),
      "checkout": getRandomElementArray(ADVERT_OFFER_TIME),
      "features": getRandomElementsArray(ADVERT_OFFER_FEATURES, getRandomInt(ADVERT_OFFER_FEATURES.length, 1)),
      "description": "строка с описанием",
      "photos": getRandomElementsArray(ADVERT_OFFER_PHOTOS, getRandomInt(ADVERT_OFFER_PHOTOS.length, 1)),
    },
    "location": {
      "x": location_x,
      "y": location_y
    }
  };
}

var createPinElement = function (map_width) {
  var template = document.querySelector("#pin")
    .content
    .querySelector(".map__pin")
    .cloneNode(true);

  var advert = generateRandomAdvert(map_width);

  fillPinElement(template, advert);

  return template;
}

var fillPinElement = function (element, advert) {
  var pinImageElement = element.querySelector("img");

  pinImageElement.alt = advert.offer.title;
  pinImageElement.src = advert.author.avatar;

  element.style.left = (advert.location.x + (MAP_PIN_WIDTH / 2)) + "px";
  element.style.top = (advert.location.y - MAP_PIN_HEIGHT) + "px";
}

var map_container = document.querySelector(".map");

var map_width = map_container.clientWidth;

var map_pins_container = document.querySelector(".map .map__pins");

map_container.classList.remove("map--faded");

var fragment = document.createDocumentFragment();

for (var i = 0; i < ADVERT_AMOUNT; i++) {
  fragment.appendChild(createPinElement(map_width));
}

map_pins_container.appendChild(fragment);
