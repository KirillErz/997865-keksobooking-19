'use strict';
(function () {

  var getPins = window.pin.getPins;
  var ENTER_KEY = window.utils.ENTER_KEY;
  var showDescriptionPin = window.card.showDescriptionPin;

  var pinMain = document.querySelector('.map__pin--main');
  var pointOnMap = document.querySelector('.map__pins');

  var activateMap = function (callback) {
    pinMain.addEventListener('mousedown', function (evt) {
      if (evt.which === 1) {
        pointOnMap.appendChild(getPins());
        document.querySelector('.map').classList.remove('map--faded');
        if (!document.querySelector('.map').classList.contains('map--faded')) {
          dragging(evt, callback);
        }

      }
    });
  };

  pinMain.addEventListener('keydown', function (event) {
    if (event.key === ENTER_KEY) {
      // ДОбавления меток на карту
      pointOnMap.appendChild(getPins());
      document.querySelector('.map').classList.remove('map--faded');
    }
  });

  var dragging = function (event, callback) {
    var startCoords = {
      x: event.clientX,
      y: event.clientY
    };
    callback(startCoords);
    var isDragged = false;
    var onMouseMove = function (moveEvt) {

      isDragged = true;
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

      var pinCoords = {
        x: (pinMain.offsetTop - shift.y),
        y: (pinMain.offsetLeft - shift.x)
      };
      callback(pinCoords);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault);
        };
        pinMain.addEventListener('click', onClickPreventDefault);
        isDragged = false;
      }
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  pointOnMap.addEventListener('mousedown', showDescriptionPin);

  window.map = {
    activateMap: activateMap
  };
})();
