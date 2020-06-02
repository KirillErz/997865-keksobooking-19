'use strict';
(function () {

  var randomInteger = window.utils.randomInteger;

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
  //  формирует моки модели Advert. принимает колличесвто сгенерированных объектов
  var generateAdvert = function (count) {

    var adverts = [];

    for (var i = 0; i < count; i++) {
      var advert = createAdvert();
      adverts.push(advert);
    }
    return adverts;
  };


  window.data = {
    adverts: generateAdvert(10),
    generateAdvert: generateAdvert
  };
})();
