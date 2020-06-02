'use strict';
(function () {

  var adverts = window.data.adverts;
  var isEmpty = window.utils.isEmpty;
  var getFragment = window.utils.getFragment;


  var pins = document.querySelector('.map__pins');
  var cardListElement = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var filters = cardListElement.querySelector('.map__filters-container');
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
    var photo = element.querySelector('.popup__photo');
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

  var closePopupCard = function () {
    var newCard = document.querySelector('.map__card');
    if (newCard !== null) {
      var closeNewCard = newCard.querySelector('.popup__close');
      closeNewCard.addEventListener('mousedown', function () {
        newCard.remove();
      });
    }
  };

  function getDescriptionPin(id) {
    var descriptionPin = null;
    for (var i = 0; i < adverts.length; i++) {
      if (adverts[i].id === Number(id)) {
        descriptionPin = adverts[i];
      }
    }
    return descriptionPin;
  }

  function deleteDescriptionPin() {
    var oldCar = document.querySelector('.map__card');
    if (oldCar !== null) {
      oldCar.remove();
    }
  }

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


  window.card = {
    showDescriptionPin: showDescriptionPin
  };

})();
