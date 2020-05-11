'use strict';
(function () {

  var ENTER_KEY = 'Enter';

  var randomInteger = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var isEmpty = function (str) {
    if (str === null || str === 'undefined') {
      return true;
    } else {
      return false;
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

  window.utils = {
    randomInteger: randomInteger,
    isEmpty: isEmpty,
    getFragment: getFragment,
    ENTER_KEY: ENTER_KEY
  };
})();
