'use strict';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKINCHECKOUT = ['12:00', '13:00', '14:00'];

var ENTER_KEY = 'Enter';
// модель данных объявления.
var createAdvert = function () {

  var width = document.querySelector('.map__pins').clientWidth;
  var randomUser = randomInteger(1, 8);
  var randomType = randomInteger(0, TYPES.length - 1);
  var randomCheckin = randomInteger(0, CHECKINCHECKOUT.length - 1);
  var randomY = randomInteger(130, 630);
  var randomX = randomInteger(1, width);

  return {
    author: {
      avatar: 'img/avatars/user' + '0' + randomUser + '.png',
    },

    offer: {
      title: 'Милая уютная квартира',
      address: '600, 350',
      price: 5000,
      type: TYPES[randomType],
      rooms: 1,
      guests: 1,
      checkin: CHECKINCHECKOUT[randomCheckin],
      checkout: CHECKINCHECKOUT[randomCheckin],
      features: FEATURES,
      description: 'Уютный отель на берегу моря',
      photos: ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
    },

    location: {
      x: randomX,
      y: randomY,
    },
  };
};
// функция возращает рандомное число от  min до max
function randomInteger(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
//  формирует моки модели Advert. принимает колличесвто сгенерированных объектов
var generateAdvert = function (count) {

  var adverts = [];

  for (var i = 0; i < count; i++) {
    var advert = createAdvert();
    adverts.push(advert);
  }
  return adverts;
};
// отриосква объявлений на карте, прнимает объявление и его шаблон
var renderMapPin = function (advert, template) {

  var element = template.cloneNode(true);

  element.querySelector('img').src = advert.author.avatar;
  element.style.cssText = 'left:' + Number(advert.location.x + element.querySelector('img').width) + 'px; top:' + Number(advert.location.y + element.querySelector('img').height) + 'px;';
  return element;
};

function isEmpty(str) {
  if (str === null || str === 'undefined') {
    return true;
  } else {
    return false;
  }
}
// скрывает блок если нет значения.
function isNotValueHideBlock(element, className, property, value) {
  if (isEmpty(value)) {
    element.querySelector(className).remove();
  } else {
    element.querySelector(className)[property] = value;
  }
}

var renderCard = function (advert, template) {

  var element = template.cloneNode(true);

  isNotValueHideBlock(element, '.popup__avatar', 'src', advert.author.avatar);
  isNotValueHideBlock(element, '.popup__title', 'textContent', advert.offer.title);
  isNotValueHideBlock(element, '.popup__text--address', 'textContent', advert.offer.address);
  isNotValueHideBlock(element, '.popup__text--price', 'textContent', advert.offer.price + ' ₽/ночь');
  isNotValueHideBlock(element, '.popup__type', 'textContent', getTitleType(advert.offer.type));
  isNotValueHideBlock(element, '.popup__text--capacity', 'textContent', 'Заезд после ' + advert.offer.checkin + ' выезд до ' + advert.offer.checkout);
  isNotValueHideBlock(element, '.popup__text--capacity', 'textContent', advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей');
  isNotValueHideBlock(element, '.popup__feature--wifi', 'textContent', advert.offer.features[0]);
  isNotValueHideBlock(element, '.popup__feature--dishwasher', 'textContent', advert.offer.features[1]);
  isNotValueHideBlock(element, '.popup__feature--parking', 'textContent', advert.offer.features[2]);
  isNotValueHideBlock(element, '.popup__feature--washer', 'textContent', advert.offer.features[3]);
  isNotValueHideBlock(element, '.popup__feature--elevator', 'textContent', advert.offer.features[4]);
  isNotValueHideBlock(element, '.popup__feature--conditioner', 'textContent', advert.offer.features[5]);
  isNotValueHideBlock(element, '.popup__description', 'textContent', advert.offer.description);

  var photo = element.querySelector('.popup__photo');
  element.querySelector('.popup__photo').remove();
  for (var i = 0; i < advert.offer.photos.length; i++) {
    var imgElement = photo.cloneNode();
    imgElement.src = advert.offer.photos[i];
    element.querySelector('.popup__photos').appendChild(imgElement);
  }
  return element;
};

// Получить тип жилья
var getTitleType = function (type) {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
    default:
      return '';
  }
};

// Получение фрагмента из сформированных моков.
// -adverts: сгенированный оюъект обявлений
// -template: шаблон отображаемого объекта
// -render: пеередается функция для отрисовки каждого объекта.
var getFragment = function (adverts, template, render) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    var advertElement = render(adverts[i], template);
    fragment.appendChild(advertElement);
  }
  return fragment;
};
// удаление класса для отображения меток.
//document.querySelector('.map').classList.remove('map--faded');

document.querySelector('.map')

var adverts = generateAdvert(10);
// Объекты добавления
var pinListElement = document.querySelector('.map__pins');
var cardListElement = document.querySelector('.map');

// Шаблоны
var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// Получить фрагмент меток на карте
var fragmentMapPin = getFragment(adverts, mapPinsTemplate, renderMapPin);
// Получить фрагмент описания меток
var fragmentCard = getFragment(adverts, cardTemplate, renderCard);
// Добавления описания на карту
var filters = cardListElement.querySelector('.map__filters-container');
//cardListElement.insertBefore(fragmentCard, filters); // insertBefore старый метод вставке елемента
// ДОбавления меток на карту
//pinListElement.appendChild(fragmentMapPin);

//события



var pinMain = document.querySelector('.map__pin--main');
var yourAdvert = document.querySelector('.ad-form');

yourAdvert.querySelector('#address').value = pinMain.style.left.replace('/px/g','') + pinMain.querySelector('img').width + ', '  + pinMain.style.top + pinMain.querySelector('img').height;
pinMain.addEventListener('mousedown', function (event) {
  if (event.which === 1) {
    document.querySelector('.map').classList.remove('map--faded');
    yourAdvert.classList.remove('ad-form--disabled');
    yourAdvert.querySelector('#address').value = event.clientX;
  }
})

pinMain.addEventListener('keydown', function (event) {
  if (event.key === ENTER_KEY) {
    document.querySelector('.map').classList.remove('map--faded');
  }
})
