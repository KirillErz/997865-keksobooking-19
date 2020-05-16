'use strict';
(function () {

  var pinMain = document.querySelector('.map__pin--main');
  var pointOnMap = document.querySelector('.map__pins');

  pinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      pointOnMap.appendChild(pin.getPins());
      document.querySelector('.map').classList.remove('map--faded');

    }
  });

  pinMain.addEventListener('keydown', function (event) {
    if (event.key === utils.ENTER_KEY) {
      // ДОбавления меток на карту
      pointOnMap.appendChild(pin.getPins());
      document.querySelector('.map').classList.remove('map--faded');
    }
  });

  pointOnMap.addEventListener('mousedown', card.showDescriptionPin);

  window.map = {

  };
})();
