'use strict';
(function () {
  var room = document.getElementById('room_number');
  var capacity = document.getElementById('capacity');
  var typeOfHousing = document.getElementById('type');
  var price = document.getElementById('price');
  // var timein = document.getElementById('timein');
  // var timeout = document.getElementById('timeout')
  var adFrom = document.querySelector('.ad-form__submit');
  // var pinMain = document.querySelector('.map__pin--main');

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

  var setAdressAdForm = function (x, y) {
    document.querySelector('.ad-form').querySelector('#address').value = x + ', ' + y;
  };

  window.form = {
    setAdressAdForm: setAdressAdForm
  };
})();
