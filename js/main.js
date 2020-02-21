'use strict';
// модель данных объявления.
var createAdvert = function () {

  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var Width = document.querySelector('.map__pins').clientWidth;

  var randomUser = randomInteger(1, 8);
  var randomType = randomInteger(0, types.length);
  var randomCheckin = randomInteger(0, checkin.length);
  var randomY = randomInteger(130, 630);
  var randomX = randomInteger(1, Width);

  return {
    author: {
      avatar: 'img/avatars/user' + '0' + randomUser + '.png',
    },

    offer: {
      title: 'Милая уютная квартира',
      address: '600, 350',
      price: 5000,
      type: types[randomType],
      rooms: 1,
      guests: 1,
      checkin: checkin[randomCheckin],
      checkout: checkout[randomCheckin],
      features: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
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
var gnerateAdvert = function (count) {

  var adverts = [];

  for (var i = 0; i < count; i++) {
    var advert = createAdvert();
    adverts.push(advert);
  }
  return adverts;
};
// отриосква объявлений на карте, прнимает объявление и его шаблон
var renderMapPin = function (advert, template) {
// var template = document.querySelector('#pin').content.querySelector('.map__pin');// Если написать сдесь эту строчку, то на 2 итерации приходить null почему ?
  var element = template.cloneNode(true);

  element.querySelector('img').src = advert.author.avatar;
  element.style.cssText = 'left:' + Number(advert.location.x + element.querySelector('img').width) + 'px; top:' + Number(advert.location.y + element.querySelector('img').height) + 'px;';
  return element;
};

document.querySelector('.map').classList.remove('map--faded');

var adverts = gnerateAdvert(100);

var pinListElement = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();
for (var i = 0; i < adverts.length; i++) {

  var advertElement = renderMapPin(adverts[i], template);
  fragment.appendChild(advertElement);
}
pinListElement.appendChild(fragment);


