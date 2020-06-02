'use strict';
(function () {
  // импортируем нужные для старта приложения фукнции
  var activateMap = window.map.activateMap;
  var setAdressAdForm = window.form.setAdressAdForm;

  // иницилизируем само приложение, просто активируя карту и форму
  activateMap(function (coords) {
    setAdressAdForm(coords.x, coords.y);
  });
})();


