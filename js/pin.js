'use strict';
(function () {

  // получить главную точку
  var mapPinsTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  // Получить фрагмент меток на карте


  // отриосква объявлений на карте, прнимает объявление и его шаблон
  var renderMapPin = function (advert, template) {
    var element = template.cloneNode(true);
    element.id = advert.id;
    element.querySelector('img').src = advert.author.avatar;
    element.style.cssText = 'left:' + Number(advert.location.x + element.querySelector('img').width) + 'px; top:' + Number(advert.location.y + element.querySelector('img').height) + 'px;';
    return element;
  };
  var getPins = function () {
    return utils.getFragment(data.adverts, mapPinsTemplate, renderMapPin);
  };


  window.pin = {
    getPins: getPins
  };
})();
