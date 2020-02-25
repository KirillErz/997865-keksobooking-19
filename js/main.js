'use strict';
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var CHECKINCHECKOUT = ['12:00', '13:00', '14:00'];
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
function isNotValueHideBlock(element, className, value) {
  if (isEmpty(value)) {
    element.querySelector(className).remove();
    return false;
  } else {
    return true;
  }
}

var renderCard = function (advert, template) {

  var element = template.cloneNode(true);

  isNotValueHideBlock(element, '.popup__avatar', advert.author.avatar) ? element.querySelector('.popup__avatar').src = advert.author.avatar : null;
  isNotValueHideBlock(element, '.popup__title', advert.offer.title) ? element.querySelector('.popup__title').title = advert.offer.title : null;
  isNotValueHideBlock(element, '.popup__text--address', advert.offer.address) ? element.querySelector('.popup__text--address').textContent = advert.offer.address : null;
  isNotValueHideBlock(element, '.popup__text--price', advert.offer.price) ? element.querySelector('.popup__text--price').textContent = advert.offer.price + ' ₽/ночь' : null;
  isNotValueHideBlock(element, '.popup__type', getTitleType(advert.offer.type)) ? element.querySelector('.popup__type').textContent = getTitleType(advert.offer.type) : null;
  isNotValueHideBlock(element, '.popup__text--capacity', advert.offer.rooms) && isNotValueHideBlock(element, '.popup__text--capacity', advert.offer.guests) ?
  element.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей' : null;
  isNotValueHideBlock(element, '.popup__text--time', advert.offer.checkin) && isNotValueHideBlock(element, '.popup__text--time', advert.offer.checkout) ?
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ' выезд до ' + advert.offer.checkout : null;
  isNotValueHideBlock(element, '.popup__feature--wifi', advert.offer.features[0]) ? element.querySelector('.popup__feature--wifi').textContent = advert.offer.features[0] : null;
  isNotValueHideBlock(element, '.popup__feature--dishwasher', advert.offer.features[1]) ? element.querySelector('.popup__feature--dishwasher').textContent = advert.offer.features[1] : null;
  isNotValueHideBlock(element, '.popup__feature--parking', advert.offer.features[2]) ? element.querySelector('.popup__feature--parking').textContent = advert.offer.features[2] : null;
  isNotValueHideBlock(element, '.popup__feature--washer', advert.offer.features[3]) ? element.querySelector('.popup__feature--washer').textContent = advert.offer.features[3] : null;
  isNotValueHideBlock(element, '.popup__feature--elevator', advert.offer.features[4]) ? element.querySelector('.popup__feature--elevator').textContent = advert.offer.features[4] : null;
  isNotValueHideBlock(element, '.popup__feature--conditioner', advert.offer.features[5]) ? element.querySelector('.popup__feature--conditioner').textContent = advert.offer.features[5] : null;
  isNotValueHideBlock(element, '.popup__description', advert.offer.description) ? element.querySelector('.popup__description').textContent = advert.offer.description : null;

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
document.querySelector('.map').classList.remove('map--faded');

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
cardListElement.insertBefore(fragmentCard, filters); // insertBefore старый метод вставке елемента
// ДОбавления меток на карту
pinListElement.appendChild(fragmentMapPin);
