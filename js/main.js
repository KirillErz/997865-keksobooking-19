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
  var id = randomInteger(1, 1000);
  return {
    id: id,
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
  element.id = advert.id;
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
  var advertElement = null;
  if (adverts.length !== undefined) {
    for (var i = 0; i < adverts.length; i++) {
      advertElement = render(adverts[i], template);
      fragment.appendChild(advertElement);
    }
  } else {
    advertElement = render(adverts, template);
    fragment.appendChild(advertElement);
  }
  return fragment;
};
// удаление класса для отображения меток.
// document.querySelector('.map').classList.remove('map--faded');

document.querySelector('.map');

var adverts = generateAdvert(100);
// Объекты добавления
var pinListElement = document.querySelector('.map__pins');
var cardListElement = document.querySelector('.map');

// Шаблоны
var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// Получить фрагмент меток на карте
var fragmentMapPin = getFragment(adverts, mapPinsTemplate, renderMapPin);
// Добавления описания на карту
var filters = cardListElement.querySelector('.map__filters-container');


var room = document.getElementById('room_number');
var capacity = document.getElementById('capacity');
var typeOfHousing = document.getElementById('type');
var price = document.getElementById('price');
var timein = document.getElementById('timein');
var timeout = document.getElementById('timeout');
// получить главную точку
var pinMain = document.querySelector('.map__pin--main');
// получить форму
var adForm = document.querySelector('.ad-form');

function getAdressPin(pin) {
  var obj = {};
  var widthPin = Number(pin.querySelector('img').width);
  var heightPin = Number(pin.querySelector('img').height);
  obj.x = Number(pin.style.left.replace('px', '')) + widthPin;
  obj.y = Number(pin.style.top.replace('px', '')) + heightPin;
  return obj;
}

// function setAdressAdForm(x, y) {
//   var pin = document.querySelector('.map__pin--main');
//   var widthPin = Number(pin.querySelector('img').width);
//   var heightPin = Number(pin.querySelector('img').height);
//   var xAdress = Number(x) + widthPin;
//   var yAdress = Number(y) + heightPin;
//   document.querySelector('.ad-form')
//   .querySelector('#address').value = xAdress + ', ' + yAdress;
// }

var closePopupCard = function () {
  var newCard = document.querySelector('.map__card');
  if (newCard !== null) {
    var closeNewCard = newCard.querySelector('.popup__close');
    closeNewCard.addEventListener('mousedown', function () {
      newCard.remove();
    });
  }
};

var adressPin = getAdressPin(pinMain);
adForm.querySelector('#address').value = adressPin.x + ', ' + adressPin.y;
pinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    pinListElement.appendChild(fragmentMapPin);
    document.querySelector('.map').classList.remove('map--faded');
    // this.style.left = (event.clientY + 40) + 'px';
    // this.style.top = (event.clientX + 44) + 'px';
    // var adress = getAdressPin(pinMain);
    // adForm.querySelector('#address').value = adress.x;
    // setAdressAdForm(event.clientX, event.clientY);
  }
});

function getDescriptionPin(id) {
  var descriptionPin = null;
  for (var i = 0; i < adverts.length; i++) {
    if (adverts[i].id === Number(id)) {
      descriptionPin = adverts[i];
    }
  }
  return descriptionPin;
}
// получение блока точек на карте.
var pins = document.querySelector('.map__pins');
// удаление описания
function deleteDescriptionPin() {
  var oldCar = document.querySelector('.map__card');
  if (oldCar !== null) {
    oldCar.remove();
  }
}
// отобразить описание точки (кароточку)
var showDescriptionPin = function (evt) {
  pins.removeEventListener('mousedown', showDescriptionPin);
  // убираем не нужное при всплытие объекта
  if (evt.target.closest('button') && evt.target.closest('button').id !== '') {
    deleteDescriptionPin();
    // получаем по id точки  описание ее
    var advert = getDescriptionPin(evt.target.closest('button').id);
    if (advert !== null) {
      var fragmentCard = getFragment(advert, cardTemplate, renderCard);
      // добавлем описание на страницу, перед объектом фильтр
      cardListElement.insertBefore(fragmentCard, filters);
      // закрытие карточки при нажатия на карточку/
      closePopupCard();
    }
  }
  pins.addEventListener('mousedown', showDescriptionPin);
};

pins.addEventListener('mousedown', showDescriptionPin);

pinMain.addEventListener('keydown', function (event) {
  if (event.key === ENTER_KEY) {
    // ДОбавления меток на карту
    pinListElement.appendChild(fragmentMapPin);
    document.querySelector('.map').classList.remove('map--faded');
  }
});

var validity = function (evt, self, element) {
  var target = evt.target;
  if (element.value !== evt.target.value) {
    self.setCustomValidity('колличетсво комнат и гостей должно совпадать');
  } else {
    target.setCustomValidity('');
  }
};

typeOfHousing.addEventListener('input', function (evt) {

  if (evt.target.value === 'bungalo') {
    price.min = 0;
    price.placeholder = 0;
  } else if (evt.target.value === 'flat') {
    price.min = 1000;
    price.placeholder = 1000;
  } else if (evt.target.value === 'house') {
    price.min = 5000;
    price.placeholder = 5000;
  } else if (evt.target.value === 'palace') {
    price.min = 10000;
    price.placeholder = 10000;
  }
});

room.addEventListener('input', function (evt) {
  validity(evt, room, capacity);
});

capacity.addEventListener('input', function (evt) {
  validity(evt, capacity, room);
});

var adFrom = document.querySelector('.ad-form__submit');

adFrom.addEventListener('click', function () {
  if (capacity.value !== room.value) {
    if (capacity.value > room.value) {
      capacity.setCustomValidity('колличетсво комнат и гостей должно совпадать');
    } else {
      room.setCustomValidity('колличетсво комнат и гостей должно совпадать');
    }
  } else {
    capacity.setCustomValidity('');
    room.setCustomValidity('');
  }
});
