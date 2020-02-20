'use strict';
// модель данных объявления.
var Advert = function () {
  this.author = {
    avatar: String,
  };

  this.offer = {
    title: String,
    address: String,
    price: Number,
    type: String,
    rooms: Number,
    guests: Number,
    checkin: String,
    checkout: String,
    features: [],
    description: String,
    photos: []
  };

  this.location = {
    x: Number,
    y: Number,
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
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var checkin = ['12:00', '13:00', '14:00'];
  var checkout = ['12:00', '13:00', '14:00'];
  var Width = document.querySelector('.map__pins').clientWidth;
  for (var i = 0; i < count; i++) {
    var randomUser = randomInteger(1, count);
    var randomType = randomInteger(0, types.length);
    var randomCheckin = randomInteger(0, checkin.length);
    var randomY = randomInteger(130, 630);
    var randomX = randomInteger(1, Width);
    var item = new Advert();
    item.author.avatar = 'img/avatars/user' + '0' + randomUser + '.png';
    item.offer.title = 'Милая уютная квартира';
    item.offer.address = '600, 350';
    item.offer.price = 5000;
    item.offer.type = types[randomType];
    item.offer.rooms = i;
    item.offer.guests = i;
    item.offer.checkin = checkin[randomCheckin];
    item.offer.checkout = checkout[randomCheckin];
    item.offer.features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    item.offer.description = 'Уютный отель на берегу моря';
    item.offer.photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
    item.location.x = randomX;
    item.location.y = randomY;
    adverts.push(item);
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

var adverts = gnerateAdvert(8);

var pinListElement = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

var fragment = document.createDocumentFragment();
for (var i = 0; i < adverts.length; i++) {

  var advertElement = renderMapPin(adverts[i], template);
  fragment.appendChild(advertElement);
}
pinListElement.appendChild(fragment);


